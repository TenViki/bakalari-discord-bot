import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (m, _, channel, author, client) => {
  const messageTs = m.createdTimestamp;
  const now = Date.now();

  const clientToBot = now - messageTs;

  const pingEmbed = createEmbed(
    author,
    "Ping",
    `Ping bota: \n\nKlient :arrow_right: Bot: ${clientToBot}ms \nBot :arrow_right: Discord: ${client.ws.ping}ms`
  );

  channel.send({ embeds: [pingEmbed] });
};

export const description = () => "Ukáže ping bota";
export const args = () => {
  return [];
};
