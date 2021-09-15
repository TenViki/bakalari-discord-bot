import { Client, User } from "discord.js";
import { info } from "./utils/logger";
import config from "config";
import { CommandType } from "./types/Command.Type";
import { createHelpEmbed, getCommands, getPrefix } from "./utils/commands";
import GuildModel from "./schema/Guild.Schema";
import { Storage } from "./storage";
import { Guild } from "./types/Guild.Type";

export const setupCommands = async (client: Client) => {
  let commands: CommandType[] = await getCommands();

  // client.on("messageCreate", async (message) => {
  //   if (message.author.bot) return;

  //   let prefix = getPrefix(message.guild);

  //   if (client.user && message.mentions.has(client.user)) {
  //     message.reply({
  //       embeds: [createHelpEmbed(commands, message.author, prefix)],
  //     });
  //     return;
  //   }

  //   if (!message.content.startsWith(prefix)) return;

  //   message.content = message.content.replace(prefix, "");

  //   const args = message.content.split(" ");

  //   const command = commands.find((el) => el.name === args[0]);
  //   if (!command) return;

  //   const guildData = message.guild
  //     ? await GuildModel.findOne({ guildId: message.guild.id })
  //     : null;

  //   command.run(
  //     message,
  //     guildData,
  //     args,
  //     message.channel,
  //     message.author,
  //     client
  //   );
  // });

  // Register slash commands
  // TODO: Make this global
  const guildId = "885046796315951154";
  const guild = client.guilds.cache.get(guildId);
  let slashCommands;

  if (guild) {
    slashCommands = guild.commands;
  } else {
    slashCommands = client.application?.commands;
  }

  info("Registering slash commands");

  for (const command of commands) {
    await slashCommands?.create({
      name: command.name,
      description: command.description(),
      options: command.params(),
    });
  }

  info(`Commands mapped [${commands.map((el) => el.name).join(", ")}]`);

  // Listening to slash commands
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    const command = commands.find((cmd) => cmd.name === commandName);

    interaction.reply({ content: "test" });
  });

  // Init prefixes
  const guilds = await GuildModel.find();
  Storage.prefixes = guilds.map((guild: Guild) => {
    return {
      guildId: guild.guildId,
      prefix: guild.prefix,
    };
  });
};
