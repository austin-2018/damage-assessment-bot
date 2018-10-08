import { Prompts,ListStyle,TextFormat } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";
import { geographicalSetting } from "@/chat/rcda-chat-helper";

export const askUserInfoDialog = rcdaChatDialog(
    "/askUserInfo",
    null,
    [
        ({ session }) => {
            session.send("Hello! This is ARC bot ready to collect Global ENA Data");
            Prompts.text(session, "Could you please tell me the name of the disaster?");
        },
        ({ session, result, skip }) => {
            session.conversationData.disasterName = result.response;
            session.conversationData.date = (new Date(Date.now())).toISOString();
            Prompts.text(session, "What is your complete name?");
        },
        ({ session, result, skip }) => {
            session.conversationData.enumerator = result.response;
            Prompts.text(session, "Please provide Geographical Area Name");
        },
        ({ session, result, skip }) => {
            session.conversationData.adminStack = result.response;
            Prompts.choice(session, "Setting?", geographicalSetting , { listStyle: ListStyle.button });
        },
        ({ session, result, skip }) => {
            session.conversationData.setting = result.response;
            session.endDialog();
        }
    ]);

const askUserInfoHelp = rcdaChatDialog(
    "/askUserInfoHelp",
    null,
    [
        ({ session }) => {
            session.send(`You can perform the following actions right now -
                
                1. Reset -- Start the submission of data from beginning
                2. Verify Admin Stack -- Verify the admin stack using your location
            `,{TextFormat:TextFormat.markdown});
            session.endDialog();
        }
    ]
);