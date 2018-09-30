import LoginRepo from "@/repo/LoginRepo";
import LoginResponse from "@common/models/services/login/LoginResponse";
import LoginRequest from "@common/models/services/login/LoginRequest";
import UserRepo from "@/repo/UserRepo";
import UserSession from "@common/models/resources/UserSession";
import UserModel from "@common/models/resources/UserModel";
import RcdaClientError from "@common/errors/RcdaClientError";
import makeModel from "@common/utils/makeModel";

export default class LoginService {
    constructor(
        private loginRepo: LoginRepo,
        private userRepo: UserRepo) {}

    public static getInstance() {
        return new LoginService(
            LoginRepo.getInstance(), 
            UserRepo.getInstance());
    }

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        if (!await this.loginRepo.verifyLogin(loginRequest)) {
            throw new RcdaClientError("The provided authentication credentials are invalid");
        }

        //TODO use user id as it is stored in the auth response
        let userId = loginRequest.username;
        let user = await this.userRepo.get(userId);
        if (!user) {
            let userModel = makeModel(UserModel, { id: userId });
            user = await this.userRepo.add(userModel);
        }

        let session: UserSession = {
            username: user.id,
            roles: user.permissions.roles,
            expires: new Date().toUTCString()
        };

        return {
            sessionToken: await this.loginRepo.getSessionToken(session)
        };
    }

    public async verify(sessionToken: string): Promise<UserSession> {
        return await this.loginRepo.parseSessionToken(sessionToken);
    }
}