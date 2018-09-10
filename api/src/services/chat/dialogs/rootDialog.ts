import { ChatConnector, UniversalBot, Middleware, Prompts, Session, MemoryBotStorage, SuggestedActions, CardAction, Message } from "botbuilder";
import ChatAddressRepo from "@/repo/ChatAddressRepo";
import IRcdaDialog from "@/services/chat/IRcdaDialog";

export default <IRcdaDialog>{
    id: "/",
    dialog: [
        function (session: Session): Promise<any> {
            let loginText = "Hi! It looks like you haven't registered yet. Please sign to continue.";
            let address = session.message.address;
            try {
                return ChatAddressRepo.getInstance().then(chatAddressRepo => {
                    chatAddressRepo.save(address);
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
                });
            }
            catch (ex) {
                console.log(ex);
                session.send("fail");
            }
        },
        function (session: any, results: any): any {
            session.userData.name = results.response;
            session.endDialog("Hi %s. Now tell me something", session.userData.name);
        }
    ]
};