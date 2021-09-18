import { ApplicationCommandOptionData, Guild } from "discord.js";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import { Errors } from "../errors/Errors";
import { login } from "../api/auth";

import UserModel from "../schema/User.Schema";
import { info } from "../utils/logger";

export const run: CommandHandler = async (i, guild, _, author) => {
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
  const { options } = i;

  const username = options.getString("username");
  const password = options.getString("password");

  if (!username || !password) {
    const errEmbed = createEmbed(i.user, "Chyba", Errors.WRONG_USAGE, true);
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const response = await login(username, password, guild.bakaUrl);
  if (!response.success) {
    const errEmbed = createEmbed(
      i.user,
      "API Chyba",
      response.error === "invalid_grant"
        ? Errors.WRONG_LOGIN
        : Errors.API_ERROR.replaceAll("error", response.error_description)
    );
    i.reply({ embeds: [errEmbed] });
    return;
  }

  const user = await UserModel.findOne({
    discordId: i.user.id,
    guildId: i.guild.id,
  });

  if (!user) {
    await UserModel.create({
      discordId: i.user.id,
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      guildId: i.guild.id,
    });
  } else {
    user.accessToken = response.access_token;
    user.refreshToken = response.refresh_token;
    await user.save();
  }

  info(
    `${i.user.id} (${i.user.username}#${i.user.discriminator}) from guild ${i.guild.id} (${i.guild.name}) has logged in.`
  );

  const embed = createEmbed(
    i.user,
    "Přihlášení bylo úspěšné",
    `Právě jsme vás přihlásili do systému bakalářu na \`${guild.bakaUrl}\``
  );
  i.reply({ embeds: [embed] });
};

export const params = (): ApplicationCommandOptionData[] => {
  return [
    {
      name: "username",
      description: "Uživatelské jméno do bakalářů",
      type: "STRING",
      required: true,
    },
    {
      name: "password",
      description: "Heslo do bakalářů",
      type: "STRING",
      required: true,
    },
  ];
};

export const description = () => "Přidá discord uživatele do systému.";
