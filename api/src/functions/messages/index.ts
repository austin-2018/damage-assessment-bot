import { ChatConnector, UniversalBot, Middleware, Prompts, MemoryBotStorage, SuggestedActions, CardAction, Message } from "botbuilder";

const connector: ChatConnector = new ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
const listener: any = connector.listen();
const bot: any = new UniversalBot(connector, { storage: new MemoryBotStorage() });

bot.dialog("/", function (session: any): any {
    session.sendTyping();

    let url: string = "https://www.facebook.com/v3.1/dialog/oauth";
    url += "?client_id=228491981184194";
    url += "&redirect_uri=https://maxtestfacebookapp.azurewebsites.net";
    url += "&state=\"{st=state123abc,ds=123456789}\"";
    url += "&scope=groups_access_member_info";
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
});

bot.use(Middleware.firstRun({ version: 1.0, dialogId: "*:/intro" }));
bot.dialog("/intro", [
    function (session: any): any {
        Prompts.text(session, "Hi! what's your name?");
    },
    function (session: any, results: any): any {
        session.userData.name = results.response;
        session.endDialog("Hi %s. Now tell me something", session.userData.name);
    }
]);

// environment glue
module.exports = function (context: any, req: any): any {
    context.log("Passing body", req.body);
    listener(req, context.res);
};