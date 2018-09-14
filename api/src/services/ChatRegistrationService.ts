import ChatRegistrationRepo from "repo/ChatRegistrationRepo";
import ChatRegistrationRequest from "@common/models/chat-registration/ChatRegistrationRequest";

export default class ChatRegistrationService {

    constructor(private chatRegistrationRepo: ChatRegistrationRepo) {}

    public static getInstance() {
        return new ChatRegistrationService(ChatRegistrationRepo.getInstance());
    }
    
    public async register(chatRegistrationRequest: ChatRegistrationRequest,): Promise<void> {
        //need user model
        if (!await this.chatRegistrationRepo.verifyRegistrationToken(chatRegistrationRequest.registrationToken)) {
            throw new Error(); //TODO
        }

        // add address for user (aka this info is needed. should get it back from repo)

        // try to message user (not a success precondition, fire and forget)
    }
}