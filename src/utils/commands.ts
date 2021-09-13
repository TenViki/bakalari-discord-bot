import fs from "fs/promises";
import { CommandType } from "../types/Command.type";

export const getCommands = async () => {
  const files = await fs.readdir("src/commands/");

  const commands: CommandType[] = [];

  for (const file of files) {
    const cmdName = file.replace(".ts", "");
    const data = await import(`../commands/${cmdName}`);

    commands.push({ ...data, name: cmdName });
  }

  return commands;
};