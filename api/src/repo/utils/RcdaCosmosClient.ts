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

    public static getInstance(): RcdaCosmosClient {
        return new RcdaCosmosClient();
    }

    public get chatAddresses(): Container {
        return this.database(RcdaCosmosClient.databaseId).container("ChatAddresses");
    }

    public get users(): Container {
        return this.database(RcdaCosmosClient.databaseId).container("Users");
    }
}