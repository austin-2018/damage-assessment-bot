import { Prompts,ListStyle,TextFormat } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";
import { sectorList } from "@/chat/rcda-chat-helper";

// TODO -- Add LUIS Recognizer to recognize and extract information from sentences which are depicted in the Help dialog below

export const askPeopleAffectedDialog = rcdaChatDialog(
    "/askAffectedPeople",
    null,
    [
        ({ session }) => {
            Prompts.number(session, "What is the number of people before disaster?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleBeforeDisaster = result.response;
            genaFormData.set("numberOfPeopleBeforeDisaster", result.response);
            Prompts.number(session, "What is the number of people who have left the area?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleLeftArea = result.response;
            genaFormData.set("numberOfPeopleLeftArea", result.response);
            Prompts.number(session, "What is the number of people who have returned?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleReturned = result.response;
            genaFormData.set("numberOfPeopleReturned", result.response);
            Prompts.number(session, "What is the number of people currently living in the area?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleLivingCurrently = result.response;
            genaFormData.set("numberOfPeopleLivingCurrently", result.response);
            Prompts.number(session, "What is the total number (SUM) of people affected?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.totalNumberOfPeopleAffected = result.response;
            genaFormData.set("totalNumberOfPeopleAffected", result.response);
            Prompts.number(session, "What is the number of people who have been displaced?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleDisplaced = result.response;
            genaFormData.set("numberOfPeopleDisplaced", result.response);
            Prompts.number(session, "What is the number of people affected who haven't displaced?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfPeopleNotDisplaced = result.response;
            genaFormData.set("numberOfPeopleNotDisplaced", result.response);
            Prompts.number(session, "What is the number of casualties?", { integerOnly: true });
        },
        ({ session, result }) => {
            session.conversationData.numberOfCasualties = result.response;
            session.endDialog();
        }
]);

const askAffectedPeopleHelp = rcdaChatDialog(
    "/askAffectedPeopleHelp",
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

const affectedPeopleInputHelp = rcdaChatDialog(
    "/affectedPeopleInputHelp",
    null,
    [
        ({ session }) => {
            session.send(`Following are some examples of what you can type when asked with a question - 
                1. 100000
                2. There were 1000 people before the disaster.
                3. Around 300 people have returned.
            `,{TextFormat:TextFormat.markdown});
        }
    ]
);