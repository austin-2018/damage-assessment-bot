
export default class ChatAddressModel {
    id!: string;
    channel!: string;
    value!: ChatAddressValue;
    registrationToken: string|null = null;
    registrationTokenIssued: string|null = null;
}

export interface ChatAddressValue {

}