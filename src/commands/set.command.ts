import { CommandHandler, ParamType } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { Errors } from "../errors/Errors";
import { ApplicationCommandOptionData, Permissions } from "discord.js";
import { getPrefix } from "../utils/commands";
import { Guild } from "../types/Guild.Type";
import GuildModel from "../schema/Guild.Schema";
import { Storage } from "../storage";

type Keys = { [n: string]: string };

export const run: CommandHandler = async (i, guild) => {
  if (!i.guild || !guild) {
    const errorEmbed = createEmbed(
      i.user,
      "Chyba",
      `${Errors.GUILD_REQUIRED}`,
      true
    );

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!i.member) return;

  if (!i.member) {
    const errorEmbed = createEmbed(i.user, "Chyba", Errors.ERR_FORBIDDEN, true);

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!args[1]) {
    const errorEmbed = createEmbed(
      i.user,
      "Chyba",
      `${Errors.WRONG_USAGE.replaceAll(
        "%prefix%",
        getPrefix(i.guild)
      ).replaceAll("%cmd%", "set")}`,
      true
    );

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!Object.keys(keys).includes(args[1])) {
    const errorEmbed = createEmbed(
      i.user,
      "Chyba",
      Errors.KEY_DOES_NOT_EXIST,
      true
    );

    m.channel.send({ embeds: [errorEmbed] });
    return;
  }

  if (!args[2]) {
    const value = guild[args[1] as keyof Guild];
    const helpembed = createEmbed(
      i.user,
      `Nastavení hodnoty ${args[1]}`,
      `${keys[args[1]]}\nAktuální hodnota: ${
        value ? "`" + value + "`" : "*Nenastaveno*"
      }`
    );

    i.reply({ embeds: [helpembed] });
    return;
  }

  await GuildModel.updateOne(
    { guildId: guild.guildId },
    { [args[1]]: args[2] }
  );

  const embed = createEmbed(
    i.user,
    "Úspěšně aktualizováno",
    `Úspěnšně jsme aktualizovali hodnotu *${args[1]}* na \`${args[2]}\``
  );

  const data = Storage.prefixes.find((d) => d.guildId === guild.guildId);
  if (data) data.prefix = args[2];

  i.reply({ embeds: [embed] });
};

export const params = (): ApplicationCommandOptionData[] => [
  {
    name: "key",
    type: "STRING",
    description: "Klíč nastavení",
    required: true,
    choices: Object.keys(keys).map((e) => {
      return {
        name: e,
        value: e,
      };
    }),
  },
  {
    name: "value",
    type: "STRING",
    description: "Hondnota nastavení",
    required: false,
  },
];

const keys: Keys = {
  prefix: "Prefix serveru, kde se nastavuje.",
  bakaUrl:
    "Url bakalářu. Měla by být ve formátu `https://bakalari.example.com/api`.",
  logChannel: "Kanál, do kterého se logují eventy.",
  timetableChannel:
    "Kanál, do kterého se bude posílat ve specifikovaný čas rozvrh hodin na příští den. (Formát `hh:mm`)",
};

export const description = () => "Nastaví konkrétní nastavení serveru";
