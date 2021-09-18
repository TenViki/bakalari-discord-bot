export interface BakalariLoginType {
  success: true;
  access_token: string;
  refresh_token: string;
}

export interface BakalariLoginErrorType {
  success: false;
  error:
    | "invalid_grant"
    | "invalid_request"
    | "invalid_client"
    | "refresh_token_invalid";
  error_description: string;
}

export interface BakalariUserType {
  success: true;
  UserUID: string;
  CampaignCategoryCode: string;
  Class: {
    Id: string;
    Abbrev: string;
    Name: string;
  };
  FullName: string;
  SchoolOrganizationName: string;
  UserType: string;
  UserTypeText: string;
}
