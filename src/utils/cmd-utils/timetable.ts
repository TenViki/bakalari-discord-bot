import { CommandInteraction } from "discord.js";
import { getTimetable } from "../../api/timetable";
import { Errors } from "../../errors/Errors";
import { Guild } from "../../types/Guild.Type";
import { TimetableType } from "../../types/Timetable.Type";
import { refreshTokenFunction } from "../commands";
import { createEmbed } from "../embed";
import { getUser } from "../user";

export const processTimetable = async (
  i: CommandInteraction,
  guild: Guild | null
): Promise<[TimetableType | null, any]> => {
  if (!guild || !i.guild) {
    const errEmbed = createEmbed(i.user, "Chyba", Errors.GUILD_REQUIRED, true);
    i.reply({ embeds: [errEmbed] });
    return [null, null];
  }

  if (!guild.bakaUrl) {
    const errEmbed = createEmbed(
      i.user,
      "Chyba",
      Errors.URL_NOT_CONFIGURED,
      true
    );
    i.reply({ embeds: [errEmbed] });
    return [null, null];
  }

  const user = await getUser(i.guild.id, i.user.id);
  if (!user) {
    const errEmbed = createEmbed(i.user, "Chyba", Errors.NOT_LOGGED_IN, true);
    i.reply({ embeds: [errEmbed] });
    return [null, null];
  }

  const d = new Date();

  if (new Date().getDay() === 6 || new Date().getDay() === 0)
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));

  let timetable = await getTimetable(user.accessToken, guild.bakaUrl, d);
  if (!timetable) {
    const userData = await refreshTokenFunction(user, guild);
    if (!userData?.success) {
      const errEmbed = createEmbed(i.user, "Chyba", Errors.TOKEN_EXPIRED, true);
      i.reply({ embeds: [errEmbed] });
    } else {
      timetable = await getTimetable(user.accessToken, guild.bakaUrl, d);
    }
  }

  return [timetable, user];
};
