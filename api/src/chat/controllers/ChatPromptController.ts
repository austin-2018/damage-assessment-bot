import RcdaBot from "@/chat/RcdaBot";
import ChatAddressRepo from "@/repo/ChatAddressRepo";
import ChatPromptRequest, { ChatPromptRequestType } from "@common/models/services/chat-prompt/ChatPromptRequest";
import RcdaSystemError from "@common/errors/RcdaSystemError";
import promptReportDialog from "@/chat/dialogs/promptReportDialog";

export default class ChatPromptController {
    constructor(private rcdaBot: RcdaBot, private chatAddressRepo: ChatAddressRepo) {}

    static getInstance(): ChatPromptController {
        return new ChatPromptController(RcdaBot.getInstance(), ChatAddressRepo.getInstance());
    }

    public async sendChatPrompt(chatPromptRequest: ChatPromptRequest) {
        
        let address = await this.chatAddressRepo.get(chatPromptRequest.chatAddressId);

        let dialogId: string;
        switch (chatPromptRequest.requestType) {
            case ChatPromptRequestType.PromptReport:
                dialogId = promptReportDialog.id;
                break;
            default:
                throw new RcdaSystemError("Chat prompt type not recognized");
        }

        this.rcdaBot.beginDialog(address, dialogId, chatPromptRequest.args);
    }
}