import {
  ApplicationCommandOptionData,
  Client,
  CommandInteraction,
  GuildMember,
  User,
} from "discord.js";
import { Guild } from "./Guild.Type";

export interface CommandType {
  run: CommandHandler;
  params: (commands?: CommandType[]) => ApplicationCommandOptionData[];
  description: () => string;
  name: string;
}

export interface ParamType {
  name: string;
  description: string;
}

export type CommandHandler = (
  interaction: CommandInteraction,
  guild: Guild | null,
  client: Client,
  author: GuildMember | undefined
) => void;
