import { MessageEmbed, User } from "discord.js";

export const createEmbed = (
  author: User,
  title: string,
  description: string
) => {
  return new MessageEmbed()
    .setColor("#3498db")
    .setTitle(title)
    .setDescription(description)
    .setFooter(
      `${author.username}#${author.discriminator}`,
      author.avatarURL({}) || ""
    )
    .setTimestamp();
};
