import axios from "axios";

export default class AuthService {
    get hasActiveSession(): boolean {
        return false;
    }

    public logIn(userEmail: string) {
        axios.post("api/chat/registration", {

        });
    }
}