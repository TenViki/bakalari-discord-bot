import config from "config";
import { Client, Intents } from "discord.js";
import { setupCommands } from "./commands";
import * as logger from "./utils/logger";

// Starting the logger
logger.setup();

// Creating the bot object with intents
const bot: Client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// Loging the bot into discord system
bot.login(config.get("bot-token"));

bot.once("ready", (cl) => {
  logger.log(
    `Successfuly logged into discord system as ${cl.user.username}#${cl.user.discriminator}`
  );

  setupCommands(cl);
});
