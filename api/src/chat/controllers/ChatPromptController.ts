import RcdaBot from "@/chat/RcdaBot";
import ChatPromptRequest, { ChatPromptRequestType } from "@common/models/services/chat-prompt/ChatPromptRequest";
import RcdaSystemError from "@common/errors/RcdaSystemError";
import promptReportDialog from "@/chat/dialogs/promptReportDialog";

export default class ChatPromptController {
    constructor(private rcdaBot: RcdaBot) {}

    static getInstance(): ChatPromptController {
        return new ChatPromptController(RcdaBot.getInstance());
    }

    public async sendChatPrompt(chatPromptRequest: ChatPromptRequest) {
        
        let dialogMap = {
            [ChatPromptRequestType.PromptReport]: promptReportDialog.id
        }
        
        let dialogId = dialogMap[chatPromptRequest.requestType];
        
        if (!dialogId) {
            throw new RcdaSystemError("Chat prompt type not recognized");
        }

        this.rcdaBot.beginDialog(chatPromptRequest.chatAddress, dialogId, chatPromptRequest.args);
    }
}