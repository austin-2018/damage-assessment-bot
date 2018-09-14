import { Context, HttpRequest, HttpResponse, HttpStatusCode } from "azure-functions-ts-essentials";
import RcdaHttpHeaders from "@/function-utils/RcdaHttpHeaders";
import UserSession from "@common/models/user/UserSession";
import LoginService from "@/services/LoginService";

class RcdaHttpResponse<TResult=null> implements HttpResponse {

    constructor(status: HttpStatusCode, body: TResult = null, headers: { [key:RcdaHttpHeaders]: string } = {}) {
        this.status = status;
        this.body = body;
        for (var header in headers) {
            this.headers[header] = header;
        }
    }

    body: TResult;
    status: HttpStatusCode;
    headers: {[x:RcdaHttpHeaders]: string} = {
        [RcdaHttpHeaders.ContentType]: "application/json"
    };
}

interface RcdaHttpRequest<TBody> extends HttpRequest {
    body: TBody;
}

type RcdaHttpFunctionContext = { context: Context, session: UserSession };

type RcdaHttpFunction<TBody, TResult, TDependencies> = 
    (req: RcdaHttpRequest<TBody>, deps: TDependencies, context: RcdaHttpFunctionContext) => Promise<RcdaHttpResponse<TResult>>;

export default function rcdaHttpFunction<TBody, TResult, TDependencies>(    
    dependenciesConstructor: new () => TDependencies,
    authenticated: boolean,
    executeFunction: RcdaHttpFunction<TBody, TResult, TDependencies>) 
{
    return async function(context: Context, req: RcdaHttpRequest<TBody>, dependencies = new dependenciesConstructor()): Promise<RcdaHttpResponse<TResult>> {
        
        let headers = {
            [RcdaHttpHeaders.ContentType]: "application/json"
        };
        
        let session = null;
        if (authenticated) {
            let loginService = LoginService.getInstance();
            //TODO bearer pattern
            session = await loginService.verify(<string>req.headers.authorization);
            if (!session) {
                return new RcdaHttpResponse(HttpStatusCode.Unauthorized, null, {what: 'hey'});
            }
            else if (false) {
                return {
                    status: HttpStatusCode.Forbidden,
                    body: null,
                    headers
                }
            }
        }
        try {
            let response = await executeFunction(req, dependencies, { context, session });
            if (response.)
        }
        catch (exception) {
            return {
                status: HttpStatusCode.InternalServerError,
                body: null,
                headers
            }
        }
    }
}