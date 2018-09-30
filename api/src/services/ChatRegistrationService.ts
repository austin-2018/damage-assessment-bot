import ChatRegistrationRepo from "repo/ChatRegistrationRepo";
import ChatRegistrationRequest from "@common/models/services/chat-registration/ChatRegistrationRequest";
import RcdaClientError from "@common/errors/RcdaClientError";
import UserSession from "@common/models/resources/UserSession";
import UserRepo from "@/repo/UserRepo";

export default class ChatRegistrationService {

    constructor(
        private chatRegistrationRepo: ChatRegistrationRepo,
        private userRepo: UserRepo) {}

    public static getInstance() {
        return new ChatRegistrationService(
            ChatRegistrationRepo.getInstance(),
            UserRepo.getInstance());
    }
    
    public async register(chatRegistrationRequest: ChatRegistrationRequest, userSession: UserSession): Promise<void> {
        //need user model
        let address = await this.chatRegistrationRepo.verifyRegistrationToken(chatRegistrationRequest.registrationToken)
        
        if (!address) {
            throw new RcdaClientError("The provided registration token is invalid.");
        }

        // add address for user (aka this info is needed. should get it back from repo)
        let user = await this.userRepo.get((<any>userSession).id);
        user.chatAddresses = user.chatAddresses || [];
        
        let targetAddress = null;//user.chatAddresses.find(c => (c.id && c.id.channelId) === address.channelId);
        if (!targetAddress) {
            //TODO user.chatAddresses.push({ id: { channelId: address.channelId, userId: address.user.id }, value: address });
        }
        else {
            // targetAddress.id.userId = address.user.id;
            // targetAddress.value = address;
        }

        await this.userRepo.update(user);

        // try to message user (not a success precondition, fire and forget)
        // TODO
    }
}