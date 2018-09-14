import { Dialog, IDialogWaterfallStep } from "botbuilder";


export default interface RcdaChatDialog {
    id: string; 
    dialog: Dialog|IDialogWaterfallStep[]|IDialogWaterfallStep;
}