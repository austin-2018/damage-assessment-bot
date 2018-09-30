import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/functions/utils/rcdaHttpFunction";
import ChatRegistrationRequest from "@common/models/services/chat-registration/ChatRegistrationRequest";
import ChatRegistrationService from "@/services/ChatRegistrationService";

class ChatRegistrationFunctionDependencies {

  constructor(public chatRegistrationService: ChatRegistrationService) {}

  static getInstance()  {
    return new ChatRegistrationFunctionDependencies(ChatRegistrationService.getInstance());
  }
}

export default rcdaHttpFunction<ChatRegistrationRequest, void, ChatRegistrationFunctionDependencies>(
  ChatRegistrationFunctionDependencies.getInstance,
  true,
  async (req, { chatRegistrationService }, { session }) => {

    await chatRegistrationService.register(req.body, session);

    return { 
      status: HttpStatusCode.OK,
      body: null
    };
  });