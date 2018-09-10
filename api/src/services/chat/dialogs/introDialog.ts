import IRcdaDialog from "@/services/chat/IRcdaDialog";
import {  Session, SuggestedActions, CardAction, Message } from "botbuilder";

export default <IRcdaDialog>{
    id: "/intro",
    dialog: function(session) {
        session.sendTyping();

        let url: string = "https://localhost:3000/login";
        // session.send("%s said %s", session.userData.name, session.message.text);
        var msg: Message = new Message(session)
                        .text("Thank you for expressing interest in our premium golf shirt! What color of shirt would you like?")
                        .suggestedActions(
                            SuggestedActions.create(
                                session, [
                                    CardAction.openUrl(session, url, "Sign In")
                                ]
                            ));
        session.send(msg);
    }
}