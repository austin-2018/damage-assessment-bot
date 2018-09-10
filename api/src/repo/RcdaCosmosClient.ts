import { CosmosClient, Container } from "@azure/cosmos";

export default class RcdaCosmosClient extends CosmosClient {
    
    private static endpoint = process.env.HOST || "https://localhost:8081/";
    private static primaryKey = process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
    private static databaseId = "Rcda";

    constructor() {
        super({ 
            endpoint: RcdaCosmosClient.endpoint, 
            auth: { 
                masterKey: RcdaCosmosClient.primaryKey 
            } 
        });
    }

    private static _instance: Promise<RcdaCosmosClient>;
    public static async getInstance(): Promise<RcdaCosmosClient> {
        if (!this._instance) {
            this._instance = new Promise<RcdaCosmosClient>(async (resolve) => {
                let instance = new RcdaCosmosClient();
                await instance.databases.createIfNotExists({ id: this.databaseId });
                resolve(instance);
            });
        }
        return await this._instance;
    }

    public get chatAddresses(): Container {
        return this.database(RcdaCosmosClient.databaseId).container("ChatAddresses");
    }
}