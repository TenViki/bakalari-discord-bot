import { Client, User } from "discord.js";
import { info } from "./utils/logger";
import config from "config";
import { CommandType } from "./types/Command.Type";
import { createHelpEmbed, getCommands } from "./utils/commands";
import GuildModel from "./schema/Guild.Schema";
import { Guild } from "./types/Guild.Type";
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");

export const setupCommands = async (client: Client) => {
  let commands: CommandType[] = await getCommands();

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

  const slashCommandsArray = commands.map((cmd) => {
    return {
      name: cmd.name,
      description: cmd.description(),
      options: cmd.params(commands),
    };
  });

  slashCommands?.set(slashCommandsArray);
  info(`Commands mapped [${commands.map((el) => el.name).join(", ")}]`);

  // Listening to slash commands
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    const command = commands.find((cmd) => cmd.name === commandName);

    const author = interaction.member
      ? interaction.guild?.members.cache.get(interaction.member.user.id) ??
        (await interaction.guild?.members.fetch(interaction.member.user.id))
      : undefined;

    if (!command) return;

    const guildData = interaction.guild
      ? await GuildModel.findOne({ guildId: interaction.guild.id })
      : null;

    command.run(interaction, guildData, client, author);
  });
};
