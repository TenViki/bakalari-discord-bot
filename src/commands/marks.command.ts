import { CommandHandler } from "../types/Command.Type";
import { processMarks } from "../utils/cmd-utils/marks";
import { processTimetable } from "../utils/cmd-utils/timetable";
import { createEmbed } from "../utils/embed";
import moment from "moment";
import { MessageActionRow, MessageSelectMenu } from "discord.js";

moment.locale("cs");

export const run: CommandHandler = async (i, guild, cl) => {
  const [marks, user] = await processMarks(i, guild);
  if (!marks || !user) return;

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("marks-selection")
      .setPlaceholder("Vyberte hodnotu")
      .addOptions(
        marks.Subjects.map((m) => {
          return {
            label: m.Subject.Name,
            value: m.Subject.Id,
          };
        })
      )
  );

  const embed = createEmbed(i.user, "Známky", `Vyberte hodnotu v menu`);

  await i.reply({ embeds: [embed], components: [row] });

  cl.on("interactionCreate", async (menuIn) => {
    if (!menuIn.isSelectMenu()) return;
    const id = menuIn.values[0];
    const subject = marks.Subjects.find((s) => s.Subject.Id === id);
    if (!subject) return menuIn.deferReply();

    subject.Marks.sort(
      (a, b) => new Date(b.MarkDate).getTime() - new Date(a.MarkDate).getTime()
    );

    const updatedEmbed = createEmbed(
      i.user,
      `Známky - ${subject.Subject.Name}`,
      `Průměr: **${subject.AverageText}** \nPočet známek: ${subject.Marks.length}`
    ).addFields(
      subject.Marks.map((m) => {
        return {
          name: `**${m.MarkText}** - ${m.Caption}`,
          value: `Váha: ${m.Weight}${
            m.ClassRankText ? "\nPořádí: " + m.ClassRankText : ""
          }\n*${moment(m.MarkDate).fromNow()}* - ${moment(m.MarkDate).format(
            "LL"
          )}`,
        };
      })
    );

    await menuIn.update({ embeds: [updatedEmbed] });
  });
};

export const description = () => "Ukáže známky uživatele";

export const params = () => {
  return [];
};
