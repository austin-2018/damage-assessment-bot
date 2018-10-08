import { Prompts,TextFormat } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";
import { sectorList, sectorSeverityScale } from "@/chat/rcda-chat-helper";

export const askSeverityInSectors = rcdaChatDialog(
    "/askSeverityInSectors",
    null,
    [
        ({ session, result, skip }) => {
            if (!result) {
                session.dialogData.form = {};
                session.dialogData.index = 0;
            } else {
                session.dialogData.form = result.form;
                session.dialogData.index = result.index;
            }
            if (session.conversationData.sectorConcern[sectorList[session.dialogData.index]]) {
                Prompts.number(session, `What is the severity of concern in **${sectorList[session.dialogData.index]}** sector?`,
                    { textFormat: TextFormat.markdown });
            } else {
                skip();
            }
        },
        ({ session, result, skip }) => {
            const sector: string = sectorList[session.dialogData.index++];
            const sectorConcernSeverity: number = result.response;
            if (sectorConcernSeverity === undefined) {
                session.dialogData.form[sector] = 0;
            } else {
                session.dialogData.form[sector] = sectorConcernSeverity;
            }
            // console.log(session.dialogData);
            // check for end of form
            if (session.dialogData.index >= sectorList.length) {
                // return completed form
                session.endDialogWithResult({ response: session.dialogData.form });
            } else {
                // next field
                session.replaceDialog("/askSeverityInSectors", session.dialogData);
            }
        }
]);

const askSeverityInSectorsHelp = rcdaChatDialog(
    "/askSeverityInSectorsHelp",
    null,
    [
        ({ session }) => {
            session.send(`You can perform the following actions right now -
                
                1. Reset -- Start the submission of data from beginning
                2. Input Help -- Provides help on how to input data for this section
                3. Sectors Selected -- Gives you a list of sectors which you have selected previously
            `,{TextFormat:TextFormat.markdown});
            session.endDialog();
        }
    ]
);

const askSeverityInSectorsInputHelp = rcdaChatDialog(
    "/askSeverityInSectorsInputHelp",
    null,
    [
        ({ session }) => {
            session.send(`Following are some examples of what you can type when asked with a question - 
                1. Food is 2 and Wash is a 4.
                2. Education
                3. Wash, Education, Food
            `);
            session.endDialog();
        }
    ]
)

const askSeverityInSectorsScale = rcdaChatDialog(
    "/askSeverityInSectorsScale",
    null,
    [
        ({ session }) => {
            session.send("Following is the definition of scale for this question -- ");
            sectorSeverityScale.forEach((value,key) => {
                session.send(`${key} -- ${value}`);
            });
            
            session.endDialog();
        }
    ]
);