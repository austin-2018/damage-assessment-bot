import ChatPromptReportRequest from "@common/models/services/chat-prompt-report/ChatPromptReportRequest";
import UserRepo from "@/repo/UserRepo";
import ChatPromptRequest, { ChatPromptRequestType } from "@common/models/services/chat-prompt/ChatPromptRequest";

export default class ChatMessageService {

    constructor(
        private userRepo: UserRepo) {}

    public static getInstance() {
        return new ChatMessageService(UserRepo.getInstance());
    }
        
    public async getChatPromptQueueItems(chatPromptRequest: ChatPromptReportRequest): Promise<ChatPromptRequest[]> {
        //TODO filter by admin stack
        let users = await this.userRepo.getAllByCountry(chatPromptRequest.country);

        let chatPrompts: ChatPromptRequest[] = [];
        
        for (const user of users) {
            if (user.chatAddresses) {
                for (const address of user.chatAddresses) {
                    chatPrompts.push({
                        chatAddress: address.value,
                        requestType: ChatPromptRequestType.PromptReport
                    });
                }
            }
        };

        return chatPrompts;
    }
}