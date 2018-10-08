import { Prompts,ListStyle,TextFormat } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";
import { geographicalSetting } from "@/chat/rcda-chat-helper";

export const askTopVulnerableGroups = rcdaChatDialog(
    "/askTopVulnerableGroups",
    null,
    [
        ({ session, result, skip }) => {
            Prompts.text(session, "What are the top three vulnerable groups (comma separated) requiring immediate assistance in this area?");
        },
        ({ session, result, skip }) => {
            let vulnerableGroups: string = result.response;
            const vulnerableGroupsArray: Array<string> = vulnerableGroups.split(",");
            session.endDialogWithResult({ response: vulnerableGroupsArray });
        }
    ]
);

// TODO Add a way to filter through the Picklists provided by ARC
const askTopVulnerableGroupsHelp = rcdaChatDialog(
    "/askTopVulnerableGroups",
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
const askTopVulnerableGroupsPickLists = rcdaChatDialog(
    "/askTopVulnerableGroupsPickLists",
    null,
    [
        ({ session }) => {
            session.send(`Following are the entities which you can enter in the response for this question -`)

            session.endDialog();
        }
    ]
);