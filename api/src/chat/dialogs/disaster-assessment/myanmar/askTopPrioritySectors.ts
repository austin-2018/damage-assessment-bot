import { Prompts,TextFormat,ListStyle } from "botbuilder";
import { sectorList,factorSeverityScale } from "@/chat/rcda-chat-helper";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

export const askTopPrioritySectors = rcdaChatDialog(
    "/askTopPrioritySectors",
    null,
    [
        ({ session, result, skip }) => {
            Prompts.text(session, "What are the top three priority sectors (comma separated) requiring immediate assistance in this area?");
        },
        ({ session, result, skip }) => {
            let immediatePrioritySectors: string = result.response;
            const immediatePrioritySectorsArray: Array<string> = immediatePrioritySectors.split(",");
            session.endDialogWithResult({ response: immediatePrioritySectorsArray });
        }
    ]
);

// TODO Add a way to filter through the Picklists provided by ARC
const askTopPrioritySectorsHelp = rcdaChatDialog(
    "/askTopPrioritySectorsHelp",
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
const askTopPrioritySectorsPickLists = rcdaChatDialog(
    "/askTopPrioritySectorsPickLists",
    null,
    [
        ({ session }) => {
            session.send(`Following are the entities which you can enter in the response for this question -`)

            session.endDialog();
        }
    ]
);