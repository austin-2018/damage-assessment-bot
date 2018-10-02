import ChatAddressRepo from "repo/ChatAddressRepo";
import ChatRegistrationRequest from "@common/models/services/chat-registration/ChatRegistrationRequest";
import RcdaClientError from "@common/errors/RcdaClientError";
import UserSession from "@common/models/resources/UserSession";
import UserRepo from "@/repo/UserRepo";
import ChatAddressModel from "../../../common/bin/models/resources/ChatAddressModel";

export default class ChatRegistrationService {

    constructor(
        private chatAddressRepo: ChatAddressRepo,
        private userRepo: UserRepo) {}

    public static getInstance() {
        return new ChatRegistrationService(
            ChatAddressRepo.getInstance(),
            UserRepo.getInstance());
    }
    
    public async register(chatRegistrationRequest: ChatRegistrationRequest, userId: string): Promise<void> {
        //need user model
        let address = await this.chatAddressRepo.getByRegistrationToken(chatRegistrationRequest.registrationToken)
        
        if (!address || this.registrationTokenHasExpired(address.registrationTokenIssued)) {
            throw new RcdaClientError("The provided registration token is invalid.");
        }

        // add address for user (aka this info is needed. should get it back from repo)
        let user = await this.userRepo.get(userId);
        user.chatAddresses = user.chatAddresses || [];
        
        let currentChannelAddressIndex = user.chatAddresses.findIndex(a => a.channel === address.channel);
        if (currentChannelAddressIndex !== -1) {
            user.chatAddresses.splice(currentChannelAddressIndex, 1);
        }
        user.chatAddresses.push({
            id: address.id,
            channel: address.channel
        });

        address.registrationToken = null;
        address.registrationTokenIssued = null;

        await Promise.all([
            this.userRepo.update(user),
            this.chatAddressRepo.update(address)
        ]);

        // try to message user (not a success precondition, fire and forget)
        // TODO - this feature may not ever be used, so this has not yet been implemented
    }

    private registrationTokenHasExpired(registrationCreationDate: string) {
        return false;
    }

    public async setupRegistrationToken(address: IAddress): Promise<string> {
        let registrationToken = this.getRegistrationToken();
        await this.cosmosClient.chatAddresses.items.upsert({ id: registrationToken, address });
        return registrationToken;
    }

    public async verifyRegistrationToken(registrationToken: string): Promise<IAddress> {
        let result = await this.cosmosClient.chatAddresses.item(registrationToken.toUpperCase()).read();
        if (!result) {
            return null;
        }
        return result.body.address;
    }

    private getRegistrationToken() {
        //TODO: validate if this is acceptable for multi-language app
        let charSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let token = "";
        for (var i = 1; i <= 6; i++) {
            token += charSet[Math.floor(Math.random() * charSet.length)]
        }
        return token;
    }
}