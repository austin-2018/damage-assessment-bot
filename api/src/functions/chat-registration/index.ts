import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/function-utils/rcdaHttpFunction";
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
  async (req, { chatRegistrationService }) => {

    await chatRegistrationService.register(req.body);

    return { 
      status: HttpStatusCode.OK,
      body: null
    };
  });