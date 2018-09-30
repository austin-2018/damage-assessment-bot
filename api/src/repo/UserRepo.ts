import RcdaCosmosClient, { RcdaContainers } from "@/repo/utils/RcdaCosmosClient";
import UserModel from "@common/models/resources/UserModel";
import RcdaSystemError from "@common/errors/RcdaSystemError";
import RcdaCountries from "@common/system/RcdaCountries";

export default class UserRepo {

    constructor(private cosmosClient: RcdaCosmosClient) {}

    public static getInstance(): UserRepo {
        return new UserRepo(RcdaCosmosClient.getInstance());
    }

    async add(user: UserModel): Promise<UserModel> {
        try {
            let response = await this.cosmosClient.users.items.create<UserModel>(user);
            return response.body;
        }
        catch (ex) {
            throw ex;
        }
    }

    async update(user: UserModel): Promise<UserModel> {
        try {
            let response = await this.cosmosClient.users.item(user.id).replace<UserModel>(user);
            return response.body;
        }
        catch (ex) {
            throw ex;
        }
    }

    async get(id: string): Promise<UserModel> {
        try {
            let result = await this.cosmosClient.users.item(id).read<UserModel>();
            return result.body;
        }
        catch (ex) {
            return null;
        }
    }

    async getByChatAddress(chatAddressId: string): Promise<UserModel> {
        let querySpec = {
            query: `
                SELECT * 
                FROM ROOT c 
                WHERE ARRAY_CONTAINS(c.chatAddresses, { chatAddressId: @chatAddressId })
            `,
            parameters: [
                { name: "@chatAddressId", value: chatAddressId }
            ] 
        };

        let response = await this.cosmosClient.users.items.query<UserModel>(querySpec).toArray();
        
        let resultCount = response.result.length;
        if (resultCount === 0) {
            return null;
        }
        if (resultCount === 1) {
            return response.result[0];
        }
        throw new RcdaSystemError("More than one user was found with the provided chat address.");
    }

    //TODO country code enum?
    async getAllByCountry(country: RcdaCountries): Promise<UserModel[]> {
        return [];
    }
}