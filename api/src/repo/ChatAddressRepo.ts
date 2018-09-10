import { IAddress } from "botbuilder";
import RcdaCosmosClient from "@/repo/RcdaCosmosClient";

type RcdaChannelUserId = {channelId: string, userId: string};

export default class ChatAddressRepo {

    constructor(rcdaCosmosClient: RcdaCosmosClient) {
        this.cosmosClient = rcdaCosmosClient;
    }

    public static async getInstance(): Promise<ChatAddressRepo> {
        return new ChatAddressRepo(await RcdaCosmosClient.getInstance());
    }

    private cosmosClient: RcdaCosmosClient;

    async save(address: IAddress): Promise<void> {
        var id = ChatAddressRepo.formatChatAddressId(address);
        await this.cosmosClient.chatAddresses.items.upsert({id, address});
    }

    async get({channelId, userId}: RcdaChannelUserId): Promise<IAddress> {
        let addressId = ChatAddressRepo.buildChatAddressId({ channelId, userId });
        let result = await this.cosmosClient.chatAddresses.item(addressId).read();
        return <IAddress><any>result.body;
    }

    static formatChatAddressId(address: IAddress) {
        return `${address.channelId}-${address.user.id}`;
    }
    
    static buildChatAddressId({channelId, userId}: RcdaChannelUserId): string {
        return `${channelId}-${userId}`;
    }
}