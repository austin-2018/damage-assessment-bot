import axios from "axios";
import LoginRequest from "@common/models/login/LoginRequest";
import LoginResponse from "@common/models/login/LoginResponse";

export default class AuthService {

    private static localStorageSessionKey = "sessionToken";

    public get hasActiveSession(): boolean {
        //todo expiration detection
        return !!localStorage.getItem(AuthService.localStorageSessionKey);
    }

    public async logIn(username: string, password: string) {
        let loginRequest: LoginRequest = {
            username,
            password
        };

        let loginResponse = await axios.post<LoginResponse>("api/login", loginRequest);

        localStorage.setItem(AuthService.localStorageSessionKey, loginResponse.data.sessionToken);
    };
}