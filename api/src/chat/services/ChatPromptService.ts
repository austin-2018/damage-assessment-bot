import RcdaBot from "@/chat/RcdaBot";
import ChatAddressRepo from "@/repo/ChatAddressRepo";
import ChatPromptRequest, { ChatPromptRequestType } from "@common/models/services/chat-prompt/ChatPromptRequest";
import RcdaSystemError from "@common/errors/RcdaSystemError";
import promptReportDialog from "@/chat/dialogs/promptReportDialog";

export default class ChatPromptService {
    constructor(private rcdaBot: RcdaBot, private chatAddressRepo: ChatAddressRepo) {}

    public async sendChatPrompt(ChatPromptRequest: ChatPromptRequest) {
        
        let address = await this.chatAddressRepo.get(ChatPromptRequest.chatAddressId);

        let dialogId: string;
        switch (ChatPromptRequest.requestType) {
            case ChatPromptRequestType.PromptReport:
                dialogId = promptReportDialog.id;
                break;
            default:
                throw new RcdaSystemError("Chat message request type not recognized");
        }

        this.rcdaBot.beginDialog(address, dialogId, ChatPromptRequest.args);
    }
}