import ChatPromptReportRequest from "@common/models/services/chat-prompt-report/ChatPromptReportRequest";
import UserRepo from "@/repo/UserRepo";
import ChatAddressRepo from "@/repo/ChatAddressRepo";
import ChatPromptRequest, { ChatPromptRequestType } from "@common/models/services/chat-prompt/ChatPromptRequest";
import RcdaBot from "@/chat/RcdaBot";
import LazyValue from "@common/utils/LazyValue";
import promptReportDialog from "@/chat/dialogs/promptReportDialog";
import RcdaSystemError from "@common/errors/RcdaSystemError";

const lazyRcdaBot = new LazyValue(() => RcdaBot.getInstance());

export default class ChatMessageService {

    constructor(
        private userRepo: UserRepo, 
        private chatAddressRepo: ChatAddressRepo) {}

    public static getInstance() {
        return new ChatMessageService(
            UserRepo.getInstance(),
            ChatAddressRepo.getInstance());
    }
        
    public async getChatPromptQueueItems(chatPromptRequest: ChatPromptReportRequest): Promise<ChatPromptRequest[]> {
        
        let users = await this.userRepo.getAllByCountry(chatPromptRequest.country);

        let chatMessages = users.map<ChatPromptRequest>(user => ({
            chatAddressId: user.lastActiveChatAddressId,
            requestType: ChatPromptRequestType.PromptReport
        }));

        return chatMessages;
    }
}