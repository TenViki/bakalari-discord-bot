import { ClientEvents } from "discord.js";

export interface EventType {
  run: EventHandler;
  name: keyof ClientEvents;
}

export type EventHandler = (...args: any[]) => Promise<void>;
