import {  Prompts } from "botbuilder";
import rcdaChatDialog from "@/chat/utils/rcdaChatDialog";

export default rcdaChatDialog(
    "/promptReport",
    null,
    [
        ({ session, result }) => {
            Prompts.text(session, "Tell me something");
        },
        ({ session, result }) => {
            session.send(result.response);
        }
    ]);
