import RcdaCosmosClient from "@/repo/utils/RcdaCosmosClient";
import ChatRegistrationModel from "@common/models/resources/ChatRegistrationModel";
import CosmosResourceRepo from "@/repo/utils/CosmosResourceRepo";

export default class ChatAddressRepo extends CosmosResourceRepo<ChatRegistrationModel> {

    constructor(cosmosClient: RcdaCosmosClient) {
        super(cosmosClient, "ChatRegistrations");
    }

    static getInstance(): ChatAddressRepo {
        return new ChatAddressRepo(RcdaCosmosClient.getInstance());
    }
}