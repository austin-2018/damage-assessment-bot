import { Context, HttpRequest, HttpResponse } from "azure-functions-ts-essentials";

interface RcdaHttpResult<TResult> extends HttpResponse {
    body: TResult;
}

interface RcdaHttpRequest<TBody> extends HttpRequest {
    body: TBody;
}

type RcdaHttpFunction<TBody, TResult, TDependencies> = 
    (req: RcdaHttpRequest<TBody>, deps: TDependencies, context: Context) => Promise<RcdaHttpResult<TResult>>;

export default function rcdaHttpFunction<TBody, TResult, TDependencies>(    
    dependenciesConstructor: new () => TDependencies,
    executeFunction: RcdaHttpFunction<TBody, TResult, TDependencies>) 
{
    return async function(context: Context, req: RcdaHttpRequest<TBody>, dependencies = new dependenciesConstructor()) {
        try {
            return await executeFunction(req, dependencies, context);
        }
        catch (exception) {
            
        }
    }
}