import { Prompts,TextFormat,ListStyle } from "botbuilder";
import { sectorList,factorSeverityScale } from "@/chat/rcda-chat-helper";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

const askSectorProblemFactorsDialog = rcdaChatDialog(
    "/askSectorProblemFactors",
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
            skip();
        },
        ({ session, result, skip }) => {
            if (session.conversationData.sectorConcern[sectorList[session.dialogData.index]]) {
                Prompts.number(session, `What is the factor scoring in Access in **${sectorList[session.dialogData.index]}** sector?`,
                    { textFormat: TextFormat.markdown });
            } else {
                skip();
            }
        },
        ({ session, result, skip }) => {
            const sector: string = sectorList[session.dialogData.index];
            let sectorConcernFactorScore: number = result.response;
            session.dialogData.form[sector] = {};
            if (sectorConcernFactorScore === undefined) {
                sectorConcernFactorScore = 0;
            }
            session.dialogData.form[sector].Access = sectorConcernFactorScore;
            console.log(session.dialogData.form);
            if (session.conversationData.sectorConcern[sectorList[session.dialogData.index]]) {
                Prompts.number(session, `What is the factor scoring in Availability in **${sectorList[session.dialogData.index]}** sector?`,
                    { textFormat: TextFormat.markdown });
            } else {
                skip();
            }
        },
        ({ session, result, skip }) => {
            const sector: string = sectorList[session.dialogData.index];
            let sectorConcernFactorScore: number = result.response;
            if (sectorConcernFactorScore === undefined) {
                sectorConcernFactorScore = 0;
            }
            session.dialogData.form[sector].Availability = sectorConcernFactorScore;
            if (session.conversationData.sectorConcern[sectorList[session.dialogData.index]]) {
                Prompts.number(session, `What is the factor scoring in Quality in **${sectorList[session.dialogData.index]}** sector?`,
                    { textFormat: TextFormat.markdown });
            } else {
                skip();
            }
        },
        ({ session, result, skip }) => {
            const sector: string = sectorList[session.dialogData.index];
            let sectorConcernFactorScore: number = result.response;
            if (sectorConcernFactorScore === undefined) {
                sectorConcernFactorScore = 0;
            }
            session.dialogData.form[sector].Quality = sectorConcernFactorScore;
            if (session.conversationData.sectorConcern[sectorList[session.dialogData.index]]) {
                Prompts.number(session, `What is the factor scoring in Use in **${sectorList[session.dialogData.index]}** sector?`,
                    { textFormat: TextFormat.markdown });
            } else {
                skip();
            }
        },
        ({ session, result, skip }) => {
            const sector: string = sectorList[session.dialogData.index++];
            let sectorConcernFactorScore: number = result.response;
            if (sectorConcernFactorScore === undefined) {
                sectorConcernFactorScore = 0;
            }
            session.dialogData.form[sector].Use = sectorConcernFactorScore;
            if (session.dialogData.index >= sectorList.length) {
                // return completed form
                session.endDialogWithResult({ response: session.dialogData.form });
            } else {
                // next field
                session.replaceDialog("/askSectorProblemFactorsDialog", session.dialogData);
            }
        }
]);

// TODO Add implementation to determine the sectors which have been selected earlier.

const askMainFactorsForProblemsHelp = rcdaChatDialog(
    "/askMainFactorsForProblemsHelp",
    null,
    [
        ({ session }) => {
            session.send(`You can perform the following actions right now -
                
                1. Reset -- Start the submission of data from beginning
                2. Input Help -- Provides help on how to input data for this section
                3. Sectors Selected -- Gives you a list of sectors which you have selected previously
                4. Scale -- Provides you with a description of the scale which can be used to input in this question
            `,{TextFormat:TextFormat.markdown});
            session.endDialog();
        }
    ]
);

const askMainFactorsForProblemsInputHelp = rcdaChatDialog(
    "/askMainFactorsForProblemsInputHelp",
    null,
    [
        // TODO Come up with the proper input syntax for this question since it has got multiple fields. Placeholder for now.
        ({ session }) => {
            session.send(`Following are some examples of what you can type when asked with a question - 
                1. Food is 2 and Wash is a 4.
                2. Education
                3. Wash, Education, Food
            `);
            session.endDialog();
        }
    ]
);

const askMainFactorsForProblemsScale = rcdaChatDialog(
    "/askMainFactorsForProblemsScale",
    null,
    [
        ({ session }) => {
            session.send("Following is the definition of scale for this question -- ");
            factorSeverityScale.forEach((value,key) => {
                session.send(`${key} -- ${value}`,{TextFormat:TextFormat.markdown});
            });
            
            session.endDialog();
        }
    ]
);