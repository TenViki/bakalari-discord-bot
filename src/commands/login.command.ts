import { ApplicationCommandOptionData } from "discord.js";
import { CommandHandler } from "../types/Command.Type";

export const run: CommandHandler = () => {};

export const params = (): ApplicationCommandOptionData[] => {
  return [
    {
      name: "server_id",
      description: "ID Discord serveru pro který se přihlašujete",
      type: "STRING",
    },
    {
      name: "username",
      description: "Uživatelské jméno do bakalářů",
      type: "STRING",
    },
    {
      name: "password",
      description: "Heslo do bakalářů",
      type: "STRING",
    },
  ];
};

export const description = () => "Přidá discord uživatele do systému.";
