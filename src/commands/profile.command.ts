import { ApplicationCommandOptionData } from "discord.js";
import { getAccessToken, getUserData } from "../api/auth";
import { Errors } from "../errors/Errors";
import { CommandHandler } from "../types/Command.Type";
import { refreshTokenFunction } from "../utils/commands";
import { createEmbed, createLines } from "../utils/embed";
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
    userData = await refreshTokenFunction(user, guild);
    if (!userData) {
      const errEmbed = createEmbed(i.user, "Chyba", Errors.TOKEN_EXPIRED, true);
      i.reply({ embeds: [errEmbed] });
      return;
    }
  }

  if (!userData || !userData.success) {
    const errEmbed = await createEmbed(i.user, "Chyba", Errors.ERR_500, true);
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const embed = createEmbed(
    i.user,
    "Profil",
    createLines([
      {
        name: "Jméno",
        value: userData.FullName,
      },
      {
        name: "Typ uživatele",
        value: userData.UserTypeText,
      },
      {
        name: "Třída",
        value: userData.Class.Name ?? userData.Class.Abbrev,
      },
      {
        name: "Škola",
        value: userData.SchoolOrganizationName,
      },
      {
        name: "ID Uživatele",
        value: userData.UserUID,
      },
    ])
  );

  i.reply({ embeds: [embed] });
};
export const description = () => "Ukáže profil uživatele";
export const params = (): ApplicationCommandOptionData[] => {
  return [];
};
