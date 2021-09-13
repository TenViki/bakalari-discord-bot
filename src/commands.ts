import { Client } from "discord.js";
import { log } from "./utils/logger";
import fs from "fs/promises";
import config from "config";
import { CommandType } from "./types/Command.type";

export const setupCommands = async (clinet: Client) => {
  log("Reading commands directory...");
  const files = await fs.readdir("src/commands/");
  let commands: CommandType[] = [];

  for (const file of files) {
    const cmdName = file.replace(".ts", "");
    const data = await import(`./commands/${cmdName}`);

    commands.push({ ...data, name: cmdName });
    log(`Successfuly mapped command ${cmdName}`);
  }

  clinet.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.get("prefix"))) return;
    message.content = message.content.replace(config.get("prefix"), "");

    const params = message.content.split(" ");
    console.log(commands);

    const command = commands.find((el) => el.name === params[0]);
    if (!command) {
      message.reply("Command not found");
      return;
    }

    command.run(message);
  });
};
