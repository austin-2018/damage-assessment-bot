import { HttpStatusCode } from "azure-functions-ts-essentials";
import rcdaHttpFunction from "@/function-utils/rcdaHttpFunction";
import ChatAddressRepo from "@/repo/ChatAddressRepo";
import ChatRegistrationModel from "@common/models/ChatLoginModel";
import ChatRegistrationService from "@/services/chat/ChatRegistrationService";

class ChatRegistrationRequestDependencies {

  public chatRegistrationService: ChatRegistrationService;

  constructor() {
    this.chatRegistrationService = new ChatRegistrationService();
  }
}

export default rcdaHttpFunction<ChatRegistrationModel, number, ChatRegistrationRequestDependencies>(
  ChatRegistrationRequestDependencies,
  async (req, { chatRegistrationService }) => {

    await chatRegistrationService.register();

    return { 
      status: HttpStatusCode.OK,
      body: null
    };
  });