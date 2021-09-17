import fs from "fs/promises";
import { CommandType } from "../types/Command.Type";
import { Guild, User } from "discord.js";
import { createEmbed } from "./embed";
import { Guild as GuildType } from "../types/Guild.Type";

export const getCommands = async () => {
  const files = await fs.readdir("src/commands/");

  const commands: CommandType[] = [];

  for (const file of files) {
    const cmdName = file.replace(".command.ts", "");
    const data = await import(`../commands/${cmdName}.command`);

    commands.push({ ...data, name: cmdName });
  }

  return commands;
};

export const createHelpEmbed = (
  commands: CommandType[],
  author: User,
  guild?: GuildType | null
) => {
  return createEmbed(
    author,
    "Nápověda",
    `Nápověda k botovi \`Bakaláři API\``
  ).addFields(
    commands.map((el) => {
      return {
        name: `/${el.name}`,
        value: el.description(),
      };
    })
  );
};
