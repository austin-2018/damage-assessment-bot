import { IAddress } from "botbuilder";
import RcdaCosmosClient from "@/repo/RcdaCosmosClient";

export default class UserRepo {

    constructor(rcdaCosmosClient: RcdaCosmosClient) {
        this.cosmosClient = rcdaCosmosClient;
    }

    public static async getInstance(): Promise<UserRepo> {
        return new UserRepo(await RcdaCosmosClient.getInstance());
    }

    private cosmosClient: RcdaCosmosClient;

    async save(id: string): Promise<void> {
        await this.cosmosClient.chatAddresses.items.upsert({ id });
    }

    async get(id: string): Promise<any> {
        let result = await this.cosmosClient.chatAddresses.item(id).read();
        return result.body;
    }
}