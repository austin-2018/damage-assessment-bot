import RcdaCosmosClient from "@/repo/utils/RcdaCosmosClient";

export default class ChatAddressRepo {

    constructor(public cosmosClient: RcdaCosmosClient) {}

    static getInstance(): ChatAddressRepo {
        return new ChatAddressRepo(RcdaCosmosClient.getInstance());
    }

    async get(id: string): Promise<any> {
        return this.cosmosClient.chatAddresses.item("");//TODO
    }

    async getByRegistrationToken(): Promise<any> {
        return this.cosmosClient;//TODO
    }
}