import { CommandHandler, ParamType } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { Errors } from "../errors/Errors";
import { ApplicationCommandOptionData, Permissions } from "discord.js";
import { Guild } from "../types/Guild.Type";
import GuildModel from "../schema/Guild.Schema";

type Keys = { [n: string]: string };

export const run: CommandHandler = async (i, guild, _, author) => {
  const { options } = i;

  const setKey = options.getString("key");
  const setValue = options.getString("value");

  if (!i.guild || !guild || !author) {
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

  if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    const errorEmbed = createEmbed(i.user, "Chyba", Errors.ERR_FORBIDDEN, true);

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!setKey) {
    const errorEmbed = createEmbed(
      i.user,
      "Chyba",
      `${Errors.WRONG_USAGE.replaceAll("%cmd%", "set")}`,
      true
    );

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!Object.keys(keys).includes(setKey)) {
    const errorEmbed = createEmbed(
      i.user,
      "Chyba",
      Errors.KEY_DOES_NOT_EXIST,
      true
    );

    i.reply({ embeds: [errorEmbed] });
    return;
  }

  if (!setValue) {
    const value = guild[setKey as keyof Guild];
    const helpembed = createEmbed(
      i.user,
      `Nastavení hodnoty ${setKey}`,
      `${keys[setKey]}\nAktuální hodnota: ${
        value ? "`" + value + "`" : "*Nenastaveno*"
      }`
    );

    i.reply({ embeds: [helpembed] });
    return;
  }

  await GuildModel.updateOne(
    { guildId: guild.guildId },
    { [setKey]: setValue }
  );

  const embed = createEmbed(
    i.user,
    "Úspěšně aktualizováno",
    `Úspěnšně jsme aktualizovali hodnotu *${setKey}* na \`${setValue}\``
  );

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
  bakaUrl:
    "Url bakalářu. Měla by být ve formátu `https://bakalari.example.com/api`.",
  logChannel: "Kanál, do kterého se logují eventy.",
  timetableChannel:
    "Kanál, do kterého se bude posílat ve specifikovaný čas rozvrh hodin na příští den. (Formát `hh:mm`)",
  timetableTime: "Čas, kdy se pošle rozvrh.",
};

export const description = () => "Nastaví konkrétní nastavení serveru";
