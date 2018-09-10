import RcdaBot from "@/services/chat/RcdaBot";
import { Dialog, IDialogWaterfallStep } from "botbuilder";


export default interface IRcdaDialog {
    id: string; 
    dialog: Dialog|IDialogWaterfallStep[]|IDialogWaterfallStep;
}