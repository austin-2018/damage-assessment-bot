import axios from "axios";
import ChatRegistrationRequest from "@common/models/services/chat-registrationChatRegistrationRequest";

export default class ChatService {

    public async registerChannel(registrationToken: string): Promise<void> {
        let request: ChatRegistrationRequest = {
            registrationToken
        };
        let sessionToken = localStorage.getItem("sessionToken");
        let headers = { "Authorization": `Bearer ${sessionToken}` };
        let response = await axios.post("api/chat/registration", request, { headers });
    }
}