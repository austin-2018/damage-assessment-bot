
const enum RcdaHttpHeaders {
    ContentType = "Content-Type"
}
export default RcdaHttpHeaders;

export function rcdaHttpHeaderDefaults() {
    return {
        [RcdaHttpHeaders.ContentType]: "application/json"
    }
}