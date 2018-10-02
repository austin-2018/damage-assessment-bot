import RcdaCosmosClient from "@/repo/utils/RcdaCosmosClient";
import ChatAddressModel from "@common/models/resources/ChatAddressModel";
import CosmosResourceRepo from "@/repo/utils/CosmosResourceRepo";
import modelProp from "@/repo/utils/modelProp";

export default class ChatAddressRepo extends CosmosResourceRepo<ChatAddressModel> {

    constructor(cosmosClient: RcdaCosmosClient) {
        super(cosmosClient, "ChatAddresses");
    }

    static getInstance(): ChatAddressRepo {
        return new ChatAddressRepo(RcdaCosmosClient.getInstance());
    }
}