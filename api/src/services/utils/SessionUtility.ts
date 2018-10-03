import * as jsonwebtoken from "jsonwebtoken";
import UserSession from "@common/models/resources/UserSession";
import UserModel from "@common/models/resources/UserModel";
import { DateUtility } from "@/services/utils/DateUtility";

export default class SessionUtility {
    constructor(private jwt: typeof jsonwebtoken, private dateUtility: DateUtility) {}

    static getInstance() {
        return new SessionUtility(jsonwebtoken, DateUtility.getInstance());
    }

    static jwtSignature = "54376454frwcbyx6c4wgurwj";

    public getUserSession(user: UserModel): UserSession {
        return {
            userId: user.id,
            roles: user.permissions.roles,
            issued: this.dateUtility.currentDateString()
        };
    }

    public getSessionToken(userSession: UserSession): string {
        
        return this.jwt.sign(userSession, SessionUtility.jwtSignature);
    }

    public parseSessionToken(token: string): UserSession {
        try {
           let session = <UserSession>this.jwt.verify(token, SessionUtility.jwtSignature);
           return session;
        }
        catch {
            return null;
        }
    }
}