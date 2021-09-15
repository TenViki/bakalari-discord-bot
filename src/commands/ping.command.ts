import { getPing } from "../api/bakalari";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (
  m,
  guild,
  _2,
  channel,
  author,
  client
) => {
  const messageTs = m.createdTimestamp;
  const now = Date.now();

  const isInDms = guild ? false : true;

  const clientToBot = now - messageTs;
  const url =
    guild && guild.bakaUrl ? getPing(guild.bakaUrl) : "*Není nakonfigurováno*";
  const errorMessage = isInDms ? "*Není dostupné v DM*" : url;

  const pingEmbed = createEmbed(
    author,
    "Ping",
    `Ping bota: \n\nKlient ➔ Bot: ${clientToBot}ms \nBot ➔ Discord: ${
      client.ws.ping
    }ms\nBot ➔ Bakaláři API ${
      guild && guild.bakaUrl ? "(" + guild.bakaUrl + ")" : ""
    }: ${errorMessage}`
  );

  channel.send({ embeds: [pingEmbed] });
};

export const description = () => "Ukáže ping bota";
export const args = () => {
  return [];
};
