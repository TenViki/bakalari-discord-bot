import { getPing } from "../api/bakalari";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (i, guild, client) => {
  const messageTs = i.createdTimestamp;
  const now = Date.now();

  const isInDms = guild ? false : true;

  const clientToBot = now - messageTs;
  const url =
    guild && guild.bakaUrl ? getPing(guild.bakaUrl) : "*Není nakonfigurováno*";
  const errorMessage = isInDms ? "*Není dostupné v DM*" : url;

  const pingEmbed = createEmbed(
    i.user,
    "Ping",
    `Ping bota: \n\nKlient ➔ Bot: ${clientToBot}ms \nBot ➔ Discord: ${
      client.ws.ping
    }ms\nBot ➔ Bakaláři API ${
      guild && guild.bakaUrl ? "(" + guild.bakaUrl + ")" : ""
    }: ${errorMessage}`
  );

  i.reply({ embeds: [pingEmbed] });
};

export const description = () => "Ukáže ping bota";
export const params = () => {
  return [];
};
