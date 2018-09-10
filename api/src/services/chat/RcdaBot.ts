import { UniversalBot, Middleware, IConnector, IBotStorage, IUniversalBotSettings } from "botbuilder";
import IRcdaDialog from "@/services/chat/IRcdaDialog";
import rootDialog from "@/services/chat/dialogs/rootDialog";
import introDialog from "@/services/chat/dialogs/introDialog";

export default class RcdaBot extends UniversalBot {
    constructor(connector: IConnector, storage: IBotStorage) {
        super(connector, <IUniversalBotSettings>{ 
            storage: storage,
            defaultDialogId: rootDialog.id
        });
     
        this.use(Middleware.firstRun({ version: 1.0, dialogId: `*:${introDialog.id}` }));
        this.use(Middleware.sendTyping());
        
        this.addDialog(introDialog);
        this.addDialog(rootDialog);
    }

    addDialog(rcdaDialog: IRcdaDialog): void {
        this.dialog(rcdaDialog.id, rcdaDialog.dialog);
    }
}