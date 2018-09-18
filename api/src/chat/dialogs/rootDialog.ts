import {  Prompts, IDialogResult } from "botbuilder";
import ChatRegistrationRepo from "@/repo/ChatRegistrationRepo";
import RcdaChatDialog from "@/chat/utils/RcdaChatDialog";
import UserRepo from "repo/UserRepo";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

export default rcdaChatDialog(
    "/",
    null,
    [
        ({ session, result }) => {
            Prompts.text(session, "Tell me something");
        },
        ({ session, result }) => {
            session.send(result.response);
        }
    ]);
