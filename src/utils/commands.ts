import fs from "fs/promises";
import { CommandType } from "../types/Command.Type";
import { Guild, User } from "discord.js";
import { Storage } from "../storage";
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

export const getPrefix = (guild: Guild | null): string => {
  if (!guild) return "bk!";

  const data = Storage.prefixes.find((g) => g.guildId === guild.id);
  if (!data) return "bk!";

  return data.prefix;
};

export const createHelpEmbed = (
  commands: CommandType[],
  author: User,
  prefix: string,
  guild?: GuildType | null
) => {
  return createEmbed(
    author,
    "Nápověda",
    `Nápověda k botovi \`Bakaláři API\`\nPrefix ${
      guild ? "pro tento server" : ""
    }: \`${prefix}\``
  ).addFields(
    commands.map((el) => {
      return {
        name: `${prefix}${el.name}`,
        value: el.description(),
      };
    })
  );
};
