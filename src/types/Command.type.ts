import { Client, Message, TextBasedChannels, User } from "discord.js";
import { Guild } from "./Guild.Type";

export interface CommandType {
  run: CommandHandler;
  params: () => ParamType[];
  description: () => string;
  name: string;
}

export interface ParamType {
  name: string;
  description: string;
}

export type CommandHandler = (
  message: Message,
  guild: Guild | null,
  args: string[],
  channel: TextBasedChannels,
  author: User,
  client: Client
) => void;
