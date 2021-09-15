import { MessageEmbed, User } from "discord.js";

export const createEmbed = (
  author: User,
  title: string,
  description: string,
  error?: boolean
) => {
  return new MessageEmbed()
    .setColor(error ? "#e74c3c" : "#3498db")
    .setTitle(title)
    .setDescription(description)
    .setFooter(
      `${author.username}#${author.discriminator}`,
      author.avatarURL({}) || ""
    )
    .setTimestamp();
};
