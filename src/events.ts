import { Client, ClientEvents } from "discord.js";
import { getEvents } from "./utils/events";
import { info } from "./utils/logger";

export const registerEvents = async (client: Client) => {
  const events = await getEvents();

  for (const event of events) {
    client.on(event.name, (...args: any) => event.run(...args));
  }

  info(`Events mapped [${events.map((el) => el.name).join(", ")}]`);
};
