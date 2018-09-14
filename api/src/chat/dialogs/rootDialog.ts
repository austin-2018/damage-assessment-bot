import {  Session, SuggestedActions, CardAction, Message, Dialog } from "botbuilder";
import ChatAddressRepo from "@/repo/ChatRegistrationRepo";
import RcdaChatDialog from "@/chat/utils/RcdaChatDialog";

export default <RcdaChatDialog>{
    id: "/",
    dialog: [
        async function (session, results, skip) {
            let loginText = "Hi! It looks like you haven't registered yet. Please sign to continue.";
            let address = session.message.address;
            let chatAddressRepo = await ChatAddressRepo.getInstance();
            let registrationToken = await chatAddressRepo.setupRegistrationToken(address);
            let url = `https://localhost:3000/login/chat`;
            let query = `?channelId=${address.channelId}&userId=${address.user.id}`;
            var msg: Message = new Message(session)
                                .text(loginText)
                                .suggestedActions(SuggestedActions.create(
                                    session,
                                    [
                                        CardAction.openUrl(session, url + query, "Sign In")
                                    ]
                                ));
            session.send(msg);
            session.send(`Your registration token: ${registrationToken}`);
        },
        function (session, results) {
            session.userData.name = results.response;
            session.endDialog("Hi %s. Now tell me something", session.userData.name);
        }
    ]
};