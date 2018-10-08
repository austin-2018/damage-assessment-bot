import { Prompts,TextFormat,ListStyle } from "botbuilder";
import { sectorList } from "@/chat/rcda-chat-helper";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

export const askConcernInSectors = rcdaChatDialog(
    "/askConcernInSectors",
    null,
    [
        ({ session, result }) => {
            // session.dialogData.index = args ? args.index : 0;
            // session.dialogData.form = args ? args.sectorConcern : {};
            if (!result) {
                session.dialogData.form = {};
                session.dialogData.index = 0;
            } else {
                session.dialogData.form = result.form;
                session.dialogData.index = result.index;
            }
            Prompts.confirm(session, `Do you have a concern in sector **${sectorList[session.dialogData.index]}** ?`,
                { listStyle: ListStyle.button });
        },
        ({ session, result }) => {
            const sector: string = sectorList[session.dialogData.index++];
            const isConcernInSector: string = result.response;
            session.dialogData.form[sector] = isConcernInSector;

            // check for end of form
            if (session.dialogData.index >= sectorList.length) {
                // return completed form
                session.endDialogWithResult({ response: session.dialogData.form });
            } else {
                // next field
                session.replaceDialog("/askConcernInSectors", session.dialogData);
            }
        }
]);

const askConcernInSectorsHelp = rcdaChatDialog(
    "/askConcernInSectorsHelp",
    null,
    [
        ({ session }) => {
            session.send(`You can perform the following actions right now -
                
                1. Reset -- Start the submission of data from beginning
                2. Input Help -- Provides help on how to input data for this section
            `,{TextFormat:TextFormat.markdown});
            session.endDialog();
        }
    ]
);

const askConcernInSectorsInputHelp = rcdaChatDialog(
    "/askConcernInSectorsInputHelp",
    null,
    [
        ({ session }) => {
            session.send(`Following are some examples of what you can type when asked with a question - 
                1. I have a concern in Food, Health & Education.
                2. Education
                3. Wash, Education, Food
            `);
            session.endDialog();
        }
    ]
)