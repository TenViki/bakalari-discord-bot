import { Guild } from "discord.js";
import { EventHandler } from "../types/Event.Type";
import { info } from "../utils/logger";
import GuildModel from "../schema/Guild.Schema";

export const run: EventHandler = async (guild: Guild) => {
  info(`Successfuly joined ${guild.id} (${guild.name})`);
  const createdGuild = await GuildModel.create({
    guildId: guild.id,
  });

  console.log(createdGuild);
};
