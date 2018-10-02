import { Context, HttpStatusCode } from "azure-functions-ts-essentials";
import { RcdaHttpFunction, RcdaHttpRequest, RcdaHttpResponse, RcdaHttpResponseError } from "@/functions/utils/rcda-http-types";
import RcdaHttpHeaders from "@/functions/utils/RcdaHttpHeaders";
import LoginService from "@/services/LoginService";
import UserSession from "@common/models/resources/UserSession";
import RcdaRoles from "@common/system/RcdaRoles";
import RcdaError from "@common/errors/RcdaError";
import RcdaClientError from "@common/errors/RcdaClientError";
import RcdaSystemError from "@common/errors/RcdaSystemError";
import RcdaAuthorizationPolicy from "@common/system/RcdaAuthorizationPolicy";
import { RcdaHttpResponseHeaders, RcdaAzureHttpFunction } from "@/functions/utils/rcda-http-types";

export default function rcdaHttpFunction<TBody, TResult, TDependencies>(    
    dependencyFactory: () => TDependencies,
    authPolicy: RcdaAuthorizationPolicy,
    executeFunction: RcdaHttpFunction<TBody, TResult, TDependencies>): RcdaAzureHttpFunction<TBody,TResult,TDependencies>
{
    let _self: any = async function(context: Context, req: RcdaHttpRequest<TBody>): Promise<RcdaHttpResponse<TResult>> 
    {
        let session: UserSession = null;
        // Authenticate, if required
        if (authPolicy) {
            let loginService = LoginService.getInstance();
            if (!req.headers.authorization || ! req.headers.authorization.toLowerCase().startsWith("bearer ")) {
                return {
                    status: HttpStatusCode.Unauthorized,
                    body: null
                }
            }
            let sessionToken = req.headers.authorization.slice("bearer ".length);
            session = await loginService.verify(sessionToken);
            if (!isValidSession(session)) {
                return {
                    status: HttpStatusCode.Unauthorized,
                    body: null
                };
            }
            else if (!isAuthorized(session, authPolicy)) {
                return {
                    status: HttpStatusCode.Forbidden,
                    body: null
                };
            }
        }
        try {
            // Execute the request
            let response = await executeFunction(req, _self.dependencyFactory(), { context, session });
            response.headers = response.headers || {};
            if (response.body && !response.headers[RcdaHttpHeaders.ContentType]) {
                response.headers[RcdaHttpHeaders.ContentType] = "application/json";
            }
            return response;
        }
        catch (error) {
            return formatErrorResponse(error);
        }
    }

    _self.dependencyFactory = dependencyFactory;

    return _self;
}

function isValidSession(session: UserSession): boolean {
    if (!session || !session.issued) {
        return false;
    }
    //TODO refactor date time logic into common utility
    let tokenIssuedDate = new Date(session.issued);

    //TODO put auth logic somewhere else?
    // Sets expiration as 30 days from issue date
    let expirationDate = new Date();
    expirationDate.setDate(tokenIssuedDate.getDate() + 30); 

    return new Date() < expirationDate;
}

function isAuthorized(session: UserSession, authPolicy: RcdaAuthorizationPolicy): boolean {
    if (!authPolicy) {
        return true;
    }
    if (authPolicy === true) {
        return !!session;
    }
    if (!session) {
        return false;
    }

    // if the function has not returned yet, can assume authPolicy is an array of roles
    let requiredRoles = <RcdaRoles[]>authPolicy;
    
    if (requiredRoles.length > 0 && !session.roles) {
        return false;
    }

    // verifies that the user has every required role, or else returns false
    return requiredRoles.every(role => session.roles.includes(role));
}

function formatErrorResponse(error: Error): RcdaHttpResponse<RcdaHttpResponseError> {
    
    if (error instanceof RcdaClientError) {
        return httpResponse(HttpStatusCode.BadRequest, formatError(error))
    }
    if (error instanceof RcdaSystemError) {
        return httpResponse(HttpStatusCode.InternalServerError);
    }
    if (error instanceof RcdaError) {
        return httpResponse(HttpStatusCode.NotImplemented);
    }
    
    return httpResponse(HttpStatusCode.InternalServerError);
}

function httpResponse(status: HttpStatusCode, body?: RcdaHttpResponseError, headers?: RcdaHttpResponseHeaders) {
    return {
        status,
        body,
        headers: headers || !body ? {} : { [RcdaHttpHeaders.ContentType]: "application/json" }
    }
}

function formatError(error: RcdaError): RcdaHttpResponseError {
    let response: RcdaHttpResponseError = {
        error: {
            code: error.typeId,
            message: error.message,
        }
    };
    if (error.details) {
        response.error.details = error.details;
    }
    return response;
}