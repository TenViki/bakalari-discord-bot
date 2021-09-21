import fs from "fs/promises";
import { CommandType } from "../types/Command.Type";
import { User } from "discord.js";
import { createEmbed } from "./embed";
import { Guild as GuildType } from "../types/Guild.Type";
import { UserType } from "../types/User.Type";
import { getAccessToken, getUserData } from "../api/auth";
import { Errors } from "../errors/Errors";
import { BakalariUserType } from "../types/Auth.Type";

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

export const refreshTokenFunction = async (
  user: any,
  guild: GuildType
): Promise<BakalariUserType | { success: false } | null> => {
  const newAccessToken = await getAccessToken(
    user.refreshToken,
    guild.bakaUrl!
  );
  if (newAccessToken.success) {
    user.accessToken = newAccessToken.access_token;
    await user.save();
    return getUserData(user.accessToken, guild.bakaUrl!);
  } else {
    return { success: false };
  }
};
