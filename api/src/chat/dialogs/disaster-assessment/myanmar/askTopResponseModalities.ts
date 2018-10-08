import { Prompts,ListStyle,TextFormat } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

export const askTopResponseModalities = rcdaChatDialog(
    "/askTopResponseModalities",
    null,
    [
        ({ session, result, skip }) => {
            // tslint:disable-next-line:max-line-length
            Prompts.text(session, "What are the top three response modalities (comma separated) you would favour? (Chose among cash assistance, Service provision, in kind, etc.). If cash selected, verify that markets are functioning…");
        },
        ({ session, result, skip }) => {
            let responseModalities: string = result.response;
            const responseModalitiesArray: Array<string> = responseModalities.split(",");
            session.endDialogWithResult({ response: responseModalitiesArray });
        }
    ]
);

// TODO Add a way to filter through the Picklists provided by ARC
const askTopResponseModalitiesHelp = rcdaChatDialog(
    "/askTopResponseModalitiesHelp",
    null,
    [
        ({ session }) => {
            session.send(`You can perform the following actions right now -
                
                1. Reset -- Start the submission of data from beginning
                2. Input Help -- Provides help on how to input data for this section
                3. Picklists -- Provides you with a list of entities which can be entered in the response for this question
            `,{TextFormat:TextFormat.markdown});
            session.endDialog();
        }
    ]
);

// TODO Add implementation for the picklists
const askTopResponseModalitiesPickLists = rcdaChatDialog(
    "/askTopResponseModalitiesPickLists",
    null,
    [
        ({ session }) => {
            session.send(`Following are the entities which you can enter in the response for this question -`)

            session.endDialog();
        }
    ]
);