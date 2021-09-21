import { CommandInteraction } from "discord.js";
import { getMarks } from "../../api/marks";
import { Errors } from "../../errors/Errors";
import { Guild } from "../../types/Guild.Type";
import { MarksType } from "../../types/Marks.Type";
import { refreshTokenFunction } from "../commands";
import { createEmbed } from "../embed";
import { getUser } from "../user";

export const processMarks = async (
  i: CommandInteraction,
  guild: Guild | null
): Promise<[MarksType | null, any]> => {
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

  let marks = await getMarks(user.accessToken, guild.bakaUrl);
  if (!marks) {
    const userData = await refreshTokenFunction(user, guild);
    if (!userData?.success) {
      const errEmbed = createEmbed(i.user, "Chyba", Errors.TOKEN_EXPIRED, true);
      i.reply({ embeds: [errEmbed] });
    } else {
      marks = await getMarks(user.accessToken, guild.bakaUrl);
    }
  }

  return [marks, user];
};
