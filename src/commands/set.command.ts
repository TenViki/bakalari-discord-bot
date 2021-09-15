import { CommandHandler, ParamType } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { Errors } from "../errors/Errors";
import { Permissions } from "discord.js";
import { getPrefix } from "../utils/commands";

export const run: CommandHandler = (m, guild, args, _, author) => {
  if (!m.guild) {
    const errorEmbed = createEmbed(
      author,
      "Chyba",
      `${Errors.GUILD_REQUIRED}`,
      true
    );

    m.channel.send({ embeds: [errorEmbed] });
    return;
  }

  if (!m.member) return console.log("huh");

  if (!m.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    const errorEmbed = createEmbed(
      author,
      "Chyba",
      `${Errors.ERR_FORBIDDEN}`,
      true
    );

    m.channel.send({ embeds: [errorEmbed] });
    return;
  }

  if (!args[1]) {
    const errorEmbed = createEmbed(
      author,
      "Chyba",
      `${Errors.WRONG_USAGE.replaceAll(
        "%prefix%",
        getPrefix(m.guild)
      ).replaceAll("%cmd%", "set")}`,
      true
    );

    m.channel.send({ embeds: [errorEmbed] });
    return;
  }

  m.channel.send("test");
};

export const params = (): ParamType[] => [
  {
    name: "[klíč nastavní]",
    description:
      "Dostupné klíče nastavení: [prefix, bakaUrl, logChannel, timetableChannel]. Bez zadaného druhého arguementu vypíše popis klíče.",
  },
  {
    name: "<hodnota nastavení>",
    description: "Hodnota nasavení",
  },
];

export const description = () => "Nastaví konkrétní nastavení serveru";
