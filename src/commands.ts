import { Client } from "discord.js";
import { log } from "./utils/logger";
import config from "config";
import { CommandType } from "./types/Command.type";
import { getCommands } from "./utils/commands";

export const setupCommands = async (client: Client) => {
  log("Reading commands directory...");

  let commands: CommandType[] = await getCommands();

  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.get("prefix"))) return;
    message.content = message.content.replace(config.get("prefix"), "");

    const args = message.content.split(" ");

    const command = commands.find((el) => el.name === args[0]);
    if (!command) {
      message.reply("Command not found");
      return;
    }

    command.run(message, args, message.channel, message.author, client);
  });
};
