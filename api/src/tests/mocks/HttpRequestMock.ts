import { HttpRequest, HttpMethod } from "azure-functions-ts-essentials";

export default class HttpRequestMock implements HttpRequest {
    constructor({ authToken = null }: { authToken?: string } = {}) {
        this.headers = {
            ["Authorization"]: authToken
        };
    }

    originalUrl: string = null;
    method: HttpMethod;
    query: { [key: string]: any };
    headers: { [key: string]: any };
    body: any;
    params: { [key: string]: any };
    rawBody: any;
}