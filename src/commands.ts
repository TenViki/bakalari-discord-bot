import { Client, User } from "discord.js";
import { info } from "./utils/logger";
import config from "config";
import { CommandType } from "./types/Command.Type";
import { createHelpEmbed, getCommands, getPrefix } from "./utils/commands";
import GuildModel from "./schema/Guild.Schema";
import { Storage } from "./storage";
import { Guild } from "./types/Guild.Type";
import { createEmbed } from "./utils/embed";

export const setupCommands = async (client: Client) => {
  let commands: CommandType[] = await getCommands();

  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    let prefix = getPrefix(message.guild);

    if (client.user && message.mentions.has(client.user)) {
      message.reply({
        embeds: [createHelpEmbed(commands, message.author, prefix)],
      });
      return;
    }

    if (!message.content.startsWith(prefix)) return;

    message.content = message.content.replace(prefix, "");

    const args = message.content.split(" ");

    const command = commands.find((el) => el.name === args[0]);
    if (!command) return;

    command.run(message, args, message.channel, message.author, client);
  });
  info(`Commands mapped [${commands.map((el) => el.name).join(", ")}]`);

  // Init prefixes
  const guilds = await GuildModel.find();
  Storage.prefixes = guilds.map((guild: Guild) => {
    return {
      guildId: guild.guildId,
      prefix: guild.prefix,
    };
  });
};
