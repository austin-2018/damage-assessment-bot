import RcdaCosmosClient from "@/repo/utils/RcdaCosmosClient";
import UserModel from "@common/models/user/UserModel";

export default class UserRepo {

    constructor(private cosmosClient: RcdaCosmosClient) {}

    public static getInstance(): UserRepo {
        return new UserRepo(RcdaCosmosClient.getInstance());
    }

    async add(user: UserModel): Promise<UserModel> {
        try {
            let response = await this.cosmosClient.users.items.create(user);
            return response.body;
        }
        catch (ex) {
            throw ex;
        }
    }

    async get(id: string): Promise<UserModel> {
        try {
            let result = await this.cosmosClient.users.item(id).read();
            return result.body;
        }
        catch (ex) {
            //TODO check error
            return null;
        }
    }
}