import { getPing } from "../api/bakalari";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (i, guild, client) => {
  const messageTs = i.createdTimestamp;
  const now = Date.now();
  const isInDms = guild ? false : true;

  const message = await i.channel?.send("Caluclating...");
  message?.delete();

  const clientToBot = (message?.createdTimestamp ?? messageTs) - messageTs;
  const url =
    guild && guild.bakaUrl
      ? (await getPing(guild.bakaUrl)) + "ms"
      : "*Není nakonfigurováno*";
  const errorMessage = isInDms ? "*Není dostupné v DM*" : url;

  const pingEmbed = createEmbed(
    i.user,
    "Ping",
    `Discord: ${clientToBot}ms \nBakaláři API ${
      guild && guild.bakaUrl ? "(" + guild.bakaUrl + ")" : ""
    }: ${errorMessage}`
  );

  i.reply({ embeds: [pingEmbed] });
};

export const description = () => "Ukáže ping bota";
export const params = () => {
  return [];
};
