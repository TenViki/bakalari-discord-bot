import { Message } from "discord.js";

export const run = (m: Message) => {
  m.reply("Timetable");
};

export const params = () => {};

export const description = () => "Shows timetable";
