import RcdaRoles from "@common/system/RcdaRoles";
 
export default class UserModel {
    id: string = "";
    permissions: UserPermissionsModel = new UserPermissionsModel();
    chatAddresses: UserChatAddressModel[] = [];
    lastActiveChatAddressId: string|null = null; 
    countries: UserCountryMembershipModel[] = [];
    lastActiveCountryId: string|null = null;
}

/*---------------------------------------------*
 *             Supporting Types                *
 *---------------------------------------------*/

export class UserPermissionsModel {
    roles: RcdaRoles[] = [];
}

export class UserChatAddressModel {
    chatAddressId!: string;
    channel!: string;
}

export class UserCountryMembershipModel {
    countryId!: string;
    adminStacks: UserAdminStackMembership[] = [];
    lastActiveAdminStack: string|null = null;
} 

export class UserAdminStackMembership {
    adminStackId!: string;
}