import { Guild } from "discord.js";
import { EventHandler } from "../types/Event.Type";
import { info } from "../utils/logger";
import GuildModel from "../schema/Guild.Schema";
import { Storage } from "../storage";

export const run: EventHandler = async (guild: Guild) => {
  info(`Successfuly joined ${guild.id} (${guild.name})`);
  const createdGuild = await GuildModel.create({
    guildId: guild.id,
  });

  Storage.prefixes.push({
    guildId: guild.id,
    prefix: createdGuild.prefix,
  });

  console.log(createdGuild);
};
