import rcdaFunction from "@/functions/utils/rcdaFunction";
import RcdaBot from "@/chat/RcdaBot";
import ChatPromptRequest from "@common/models/services/chat-prompt/ChatPromptRequest";
import ChatMessageService from "@/services/ChatPromptReportService";
import LazyValue from "@common/utils/LazyValue";

class ChatPromptFunctionDependencies {

    constructor(public rcdaBot: RcdaBot, public chatMessageService: ChatMessageService) {}

    private static lazyRcdaBot = new LazyValue(() => RcdaBot.getInstance());

    static getInstance() {
        return new ChatPromptFunctionDependencies(
            this.lazyRcdaBot.value, 
            ChatMessageService.getInstance());
    }
}

export default rcdaFunction<{chatMessage: ChatPromptRequest}, ChatPromptFunctionDependencies>(
    ChatPromptFunctionDependencies.getInstance,
    async ({ chatMessage }, { rcdaBot, chatMessageService }) => {
        //TODO await chatMessageService.sendChatMessage(chatMessage);
    }
);