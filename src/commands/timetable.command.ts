import { Message, TextBasedChannels } from "discord.js";
import { getTimetable } from "../api/timetable";
import { CommandHandler } from "../types/Command.type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (m, _, channel, author) => {
  // Nothing here yet
};

export const params = () => {
  return [];
};

export const description = () => "Shows timetable";
