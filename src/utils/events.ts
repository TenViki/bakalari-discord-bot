import fs from "fs/promises";
import { EventType } from "../types/Event.Type";

export const getEvents = async () => {
  const files = await fs.readdir("src/events/");

  const commands: EventType[] = [];

  for (const file of files) {
    const cmdName = file.replace(".event.ts", "");
    const data = await import(`../events/${cmdName}.event`);

    commands.push({ ...data, name: cmdName });
  }

  return commands;
};
