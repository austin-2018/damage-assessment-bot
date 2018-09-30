import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/functions/utils/rcdaHttpFunction";
import ChatPromptReportRequest from "@common/models/services/chat-prompt-report/ChatPromptReportRequest";
import ChatMessageService from "@/services/ChatPromptReportService";
import ChatPromptRequest from "@common/models/services/chat-prompt/ChatPromptRequest";
import RcdaRoles from "@common/system/RcdaRoles";

class ChatPromptFunctionDependencies {

  constructor(public chatMessageService: ChatMessageService) {}

  static getInstance() {
    return new ChatPromptFunctionDependencies(ChatMessageService.getInstance())
  }
}

export default rcdaHttpFunction<ChatPromptReportRequest, void, ChatPromptFunctionDependencies>(
  ChatPromptFunctionDependencies.getInstance,
  [RcdaRoles.Admin],
  async (req, { chatMessageService }, { context }) => {

    let bindings = <{queueItems: ChatPromptRequest[]}>context.bindings;

    bindings.queueItems = await chatMessageService.getChatPromptQueueItems(req.body);

    return { 
      status: HttpStatusCode.Accepted,
      body: null
    };
  });