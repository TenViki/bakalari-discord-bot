import { MessageEmbed, TextBasedChannels, User } from "discord.js";
import { CommandHandler, CommandType, ParamType } from "../types/Command.type";
import config from "config";
import { getCommands } from "../utils/commands";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (_, args, channel, author) => {
  if (args[1]) return sendHelpOneCommand(args[1], channel, author);

  const commands = await getCommands();

  const helpEmbed = createEmbed(
    author,
    "Nápověda",
    "Nápověda k botovi `Bakaláři API`"
  ).addFields(
    commands.map((el) => {
      return {
        name: `${config.get("prefix")}${el.name}`,
        value: el.description(),
      };
    })
  );

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
