import { RcdaAzureHttpFunction, RcdaHttpResponse, RcdaHttpRequest } from "@/functions/utils/rcda-http-types";
import rcdaHttpFunction from "@/functions/utils/rcdaHttpFunction";

export default async function testRcdaHttpFunction<TBody, TResult, TDependencies>(config: {
    definition: RcdaAzureHttpFunction<TBody, TResult, TDependencies>,
    dependencies?: Partial<TDependencies>,
    request?: RcdaHttpRequest<TBody>
}): Promise<RcdaHttpResponse<TResult>> {

    let testFunction = rcdaHttpFunction(() => <TDependencies>config.dependencies, config.definition.authPolicy, config.definition.implementation);
    
    return await testFunction(null/*never needed, at least yet*/, config.request);
}