import { ApplicationCommandOptionData } from "discord.js";
import { getAccessToken, getUserData } from "../api/auth";
import { Errors } from "../errors/Errors";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { getUser } from "../utils/user";

export const run: CommandHandler = async (i, guild, client) => {
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
  let userData = await getUserData(user.accessToken, guild.bakaUrl);

  if (!userData) {
    const newAccessToken = await getAccessToken(
      user.refreshToken,
      guild.bakaUrl
    );
    if (newAccessToken.success) {
      user.accessToken = newAccessToken.access_token;
      userData = await getUserData(user.accessToken, guild.bakaUrl);
      await user.save();
    } else {
      const errEmbed = await createEmbed(
        i.user,
        "Chyba",
        Errors.TOKEN_EXPIRED,
        true
      );
      i.reply({ embeds: [errEmbed] });
      return;
    }
  }

  if (!userData || !userData.success) {
    const errEmbed = await createEmbed(i.user, "Chyba", Errors.ERR_500, true);
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const embed = createEmbed(i.user, "Profil", userData.FullName);

  i.reply({ embeds: [embed] });
};
export const description = () => "Ukáže ping bota";
export const params = (): ApplicationCommandOptionData[] => {
  return [];
};
