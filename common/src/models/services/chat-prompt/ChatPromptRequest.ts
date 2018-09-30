
export default interface ChatPromptRequest {
    chatAddressId: string;
    requestType: ChatPromptRequestType;
    args?: any
}

// Supporting types
export enum ChatPromptRequestType {
    PromptReport = "PromptReport"
}