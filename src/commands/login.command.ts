import { CommandHandler, ParamType } from "../types/Command.type";

export const run: CommandHandler = (m) => {};

export const params = (): ParamType[] => {
  return [
    {
      name: "[server id]",
      description: "ID Discord serveru pro který se přihlašujete",
    },
    {
      name: "[username]",
      description: "Uživatelské jméno do bakalářů",
    },
    {
      name: "[password]",
      description: "Heslo do bakalářů",
    },
  ];
};

export const description = () => "Přidá discord uživatele do systému.";
