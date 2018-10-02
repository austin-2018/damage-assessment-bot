import * as jsonwebtoken from "jsonwebtoken";
import UserSession from "@common/models/resources/UserSession";
import UserModel from "@common/models/resources/UserModel";

export default class SessionUtility {
    constructor(private jwt: typeof jsonwebtoken) {}

    static getInstance() {
        return new SessionUtility(jsonwebtoken);
    }

    static jwtSignature = "54376454frwcbyx6c4wgurwj";

    public async getSessionToken(user: UserModel): Promise<string> {
        let userSession: UserSession = {
            userId: user.id,
            roles: user.permissions.roles,
            issued: new Date().toUTCString()
        };
        
        return this.jwt.sign(userSession, SessionUtility.jwtSignature);
    }

    public async parseSessionToken(token: string): Promise<UserSession> {
        try {
           let session = <UserSession>this.jwt.verify(token, SessionUtility.jwtSignature);
           return session;
        }
        catch {
            return null;
        }
    }
}