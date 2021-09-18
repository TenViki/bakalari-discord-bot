export enum Errors {
  ERR_FORBIDDEN = "Uživatel nemá právo na tuto akci. (ERR_FORBIDDEN)",
  GUILD_REQUIRED = "Tato akce je dostupná pouze na serverech. (GUILD_REQUIRED)",
  WRONG_USAGE = "Špatně použité argumenty. Napiště `/help %cmd%` pro získání nápovědy. (WRONG_USAGE)",
  KEY_DOES_NOT_EXIST = "Klíč neexistuje. (KEY_DOES_NOT_EXIST)",
  URL_NOT_CONFIGURED = "Url bakalářu není konfigurovaná. (URL_NOT_CONFIGURED)",
  API_ERROR = "Bakaláři API server vrátil error %error%. (API_ERROR)",
  WRONG_LOGIN = "Špatné uživatelské jméno nebo heslo.",
  NOT_LOGGED_IN = "Nejste přihlášeni. (NOT_LOGGED_IN)",
  TOKEN_EXPIRED = "Refresh token expiroval, je třeba se znovu přihlásit s příkazem `/login`. (TOKEN_EXPIRED)",
  ERR_500 = "Něco se stalo špatně. (ERR_500)",
}
