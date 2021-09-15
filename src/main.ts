import config from "config";
import { Client, Intents } from "discord.js";
import mongoose from "mongoose";
import { setupCommands } from "./commands";
import { registerEvents } from "./events";
import { Storage } from "./storage";
import * as logger from "./utils/logger";

// Enabling weird SSL, because our bakalari does have that (Found it on Stack Overflow and it works, so..)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

// Starting the logger
logger.setup();

Storage.prefixes = [
  {
    guildId: "5343214",
    prefix: "test",
  },
];

// Loading the mongoose stuff
mongoose
  .connect(config.get("mongoose-connection-string"))
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Could not connect to MongoDB", err));

// Creating the bot object with intents
const bot: Client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["MESSAGE", "USER", "CHANNEL", "GUILD_MEMBER", "REACTION"],
});
// Loging the bot into discord system
bot.login(config.get("bot-token"));

bot.once("ready", (cl) => {
  logger.info(
    `Successfuly logged into discord system as ${cl.user.username}#${cl.user.discriminator}`
  );

  setupCommands(cl);
  registerEvents(cl);
});
