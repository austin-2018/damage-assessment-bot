import axios, { AxiosInstance } from "axios";
import { sign, SignOptions, Secret, VerifyOptions, verify } from "jsonwebtoken";
import LoginRequest from "@common/models/login/LoginRequest";
import UserModel from "@common/models/user/UserModel";
import UserSession from "@common/models/user/UserSession";
import RcdaCosmosClient from "@/repo//utils/RcdaCosmosClient";

type RcdaJsonWebToken = {
    sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
    ): string;
    verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: VerifyOptions,
    ): object | string;
}

export default class LoginRepo {
    constructor(
        private cosmosClient: RcdaCosmosClient,
        private axios: AxiosInstance, 
        private jwt: RcdaJsonWebToken) {}

    static getInstance() {
        return new LoginRepo(RcdaCosmosClient.getInstance(), axios, { sign, verify });
    }

    public async verifyLogin(loginCredentials: {username: string, password: string}): Promise<boolean> {
        if (loginCredentials.username === "testuser") {
            return true;
        }
        return false;
    }

    static jwtSignature = "54376454frwcbyx6c4wgurwj";

    public async getSessionToken(user: UserModel): Promise<string> {
        return this.jwt.sign(user, LoginRepo.jwtSignature);
    }

    public async parseSessionToken(token: string): Promise<UserSession> {
        try {
            return this.jwt.verify(token, LoginRepo.jwtSignature);
        }
        catch {
            null;
        }
    }
}