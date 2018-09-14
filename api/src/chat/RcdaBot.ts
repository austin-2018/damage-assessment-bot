import { UniversalBot, Middleware, IConnector, IBotStorage, IUniversalBotSettings, Session, IAddress, IIdentity, IMiddlewareMap } from "botbuilder";
import RcdaChatDialog from "@/chat/utils/RcdaChatDialog";
import rootDialog from "@/chat/dialogs/rootDialog";

export default class RcdaBot extends UniversalBot {
    constructor(connector: IConnector, storage: IBotStorage) {
        super(connector, <IUniversalBotSettings>{ 
            storage: storage,
            defaultDialogId: rootDialog.id
        });
     
        this.use(Middleware.sendTyping());

        this.addDialog(rootDialog);
    }

    addDialog(chatDialog: RcdaChatDialog): void {
        this.dialog(chatDialog.id, chatDialog.dialog);
    }
}