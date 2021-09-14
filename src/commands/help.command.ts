import { TextBasedChannels, User } from "discord.js";
import { CommandHandler, CommandType, ParamType } from "../types/Command.Type";
import config from "config";
import { getCommands, getPrefix } from "../utils/commands";
import { createEmbed } from "../utils/embed";
import { createHelpEmbed } from "../utils/commands";

export const run: CommandHandler = async (m, args, channel, author) => {
  if (args[1]) return sendHelpOneCommand(args[1], channel, author);

  const commands = await getCommands();

  const helpEmbed = createHelpEmbed(commands, author, getPrefix(m.guild));

  channel.send({ embeds: [helpEmbed] });
};

export const params = (): ParamType[] => {
  return [
    {
      name: "<příkaz>",
      description: "Ukáže nápovědu k danému příkazu",
    },
  ];
};

export const description = () =>
  "Ukáže nápovědu, druhý argument se dá použít jako jméno argumentu.";

const sendHelpOneCommand = async (
  command: string,
  channel: TextBasedChannels,
  author: User
) => {
  try {
    const cmdData: CommandType = await import(`../commands/${command}`);
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
    channel.send({ embeds: [helpEmbed] });
  } catch (error) {
    channel.send("Příkaz nebyl nalezen");
  }
};
