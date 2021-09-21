import {
  ApplicationCommandOptionData,
  CommandInteraction,
  User,
} from "discord.js";
import { CommandHandler, CommandType } from "../types/Command.Type";
import { createHelpEmbed, getCommands } from "../utils/commands";
import { createEmbed } from "../utils/embed";
import { error } from "../utils/logger";

export const run: CommandHandler = async (i, guild) => {
  const commandArg = i.options.getString("command");
  if (commandArg) return sendHelpOneCommand(commandArg, i, i.user);

  const commands = await getCommands();

  const helpEmbed = createHelpEmbed(commands, i.user, guild);

  i.reply({ embeds: [helpEmbed] });
};

export const params = (
  commands: CommandType[]
): ApplicationCommandOptionData[] => {
  return [
    {
      name: "command",
      type: "STRING",
      choices: commands?.map((e) => {
        return { name: e.name, value: e.name };
      }),
      description: "Příkaz pro který chcete zobrazit nápovědu",
      required: false,
    },
  ];
};

export const description = () =>
  "Ukáže nápovědu, druhý argument se dá použít jako jméno argumentu.";

const sendHelpOneCommand = async (
  command: string,
  i: CommandInteraction,
  author: User
) => {
  try {
    const cmdData: CommandType = await import(`../commands/${command}.command`);
    const helpEmbed = createEmbed(
      author,
      `Nápověda • ${command}`,
      cmdData.description()
    ).addFields(
      cmdData.params().map((el) => {
        return {
          name: el.name,
          value: el.description,
        };
      })
    );
    i.reply({ embeds: [helpEmbed] });
  } catch (ex) {
    error("Error", ex);
    i.reply("Příkaz nebyl nalezen");
  }
};
