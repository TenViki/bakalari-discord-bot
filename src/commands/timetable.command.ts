import { getTimetable } from "../api/timetable";
import { Errors } from "../errors/Errors";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { getUser } from "../utils/user";

export const run: CommandHandler = async (i, guild) => {
  if (!guild || !i.guild) {
    const errEmbed = createEmbed(i.user, "Chyba", Errors.GUILD_REQUIRED, true);
    i.reply({ embeds: [errEmbed] });
    return;
  }

  if (!guild.bakaUrl) {
    const errEmbed = createEmbed(
      i.user,
      "Chyba",
      Errors.URL_NOT_CONFIGURED,
      true
    );
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const user = await getUser(i.guild.id, i.user.id);
  if (!user) {
    const errEmbed = createEmbed(i.user, "Chyba", Errors.NOT_LOGGED_IN, true);
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const timetable = await getTimetable(user.accessToken, guild.bakaUrl);
};

export const params = () => {
  return [];
};

export const description = () => "Shows timetable";
