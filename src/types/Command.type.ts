import {
  ApplicationCommandOptionData,
  Client,
  CommandInteraction,
} from "discord.js";
import { Guild } from "./Guild.Type";

export interface CommandType {
  run: CommandHandler;
  params: () => ApplicationCommandOptionData[];
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
  client: Client
) => void;
