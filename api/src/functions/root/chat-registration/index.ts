import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/functions/utils/rcdaHttpFunction";
import ChatRegistrationRequest from "@common/models/chat-registration/ChatRegistrationRequest";
import ChatRegistrationService from "@/services/ChatRegistrationService";

class ChatRegistrationRequestDependencies {

  public chatRegistrationService: ChatRegistrationService;

  constructor() {
    this.chatRegistrationService = ChatRegistrationService.getInstance();
  }
}

export default rcdaHttpFunction<ChatRegistrationRequest, void, ChatRegistrationRequestDependencies>(
  ChatRegistrationRequestDependencies,
  true,
  async (req, { chatRegistrationService }, { session }) => {

    await chatRegistrationService.register(req.body, session);

    return { 
      status: HttpStatusCode.OK,
      body: null
    };
  });