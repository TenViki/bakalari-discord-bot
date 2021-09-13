import { Message } from "discord.js";

export interface CommandType {
  run: (message: Message) => void;
  params: () => string[];
  description: () => string;
  name: string;
}
