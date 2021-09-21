import { Errors } from "../errors/Errors";
import { CommandHandler } from "../types/Command.Type";
import { createEmbed } from "../utils/embed";
import UserModel from "../schema/User.Schema";

export const run: CommandHandler = async (i, guild) => {
  if (!guild || !i.guild) {
    const e = createEmbed(i.user, "Chyba", Errors.GUILD_REQUIRED, true);
    i.reply({ embeds: [e] });
    return;
  }
  const user = await UserModel.findOne({
    discordId: i.user.id,
    guildId: i.guild.id,
  });

  if (!user) {
    const e = createEmbed(i.user, "Chyba", Errors.NOT_LOGGED_IN, true);
    i.reply({ embeds: [e] });
    return;
  }

  await user.remove();
  const e = createEmbed(
    i.user,
    "Odhlášení proběhlo úspěšně",
    "Úspěšně jsme Vás odhlásili a odebrali jsme Vás ze systému."
  );
  i.reply({ embeds: [e] });
};
export const description = () => "Ukáže profil uživatele";
export const params = () => {
  return [];
};
