import { Message } from "discord.js";

export const run = (m: Message) => {
  m.reply("Yo this is help!");
};

export const params = () => {};

export const description = () => "Hop this helps. :D";
