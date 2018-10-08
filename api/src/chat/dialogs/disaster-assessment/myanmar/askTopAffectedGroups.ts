import { Prompts,TextFormat,ListStyle } from "botbuilder";
import { sectorList,factorSeverityScale } from "@/chat/rcda-chat-helper";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

const askTopAffectedGroups = rcdaChatDialog(
    "/askTopAffectedGroups",
    null,
    [
        ({ session, result, skip }) => {
            Prompts.text(session, "Who are the top three affected groups (comma-separated) that require immediate assistance in this area?");
        },
        ({ session, result, skip }) => {
            let groupsAffected: string = result.response;
            const groupsAffectedArray: Array<string> = groupsAffected.split(",");
            session.endDialogWithResult({ response: groupsAffectedArray });
        }
    ]
);

// TODO Add a way to filter through the Picklists provided by ARC
const askTopAffectedGroupsHelp = rcdaChatDialog(
    "/askTopAffectedGroupsHelp",
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
const askTopAffectedGroupsPickLists = rcdaChatDialog(
    "/askTopAffectedGroupsPickLists",
    null,
    [
        ({ session }) => {
            session.send(`Following are the entities which you can enter in the response for this question -`)

            session.endDialog();
        }
    ]
);