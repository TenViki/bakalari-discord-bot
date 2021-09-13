import { Message, TextBasedChannels } from "discord.js";
import { getTimetable } from "../api/timetable";
import { CommandHandler } from "../types/Command.type";
import { createEmbed } from "../utils/embed";

export const run: CommandHandler = async (m, _, channel, author) => {
  const timetable = await getTimetable();

  const tableEmbed = createEmbed(
    author,
    "Rozvrh hodin",
    `Vyučovací rozrh hodin na ${timetable.date}`
  ).addFields(
    timetable.subjects.map((s) => {
      const changeInfo = s.changeInfo ? "\n **Změna:** " + s.changeInfo : "";
      const data = s.room ? `${s.teacher} | ${s.room}  | ` : "";

      return {
        name: s.name,
        value: s.end ? s.time + " " : `${data} ${s.time}${changeInfo}`,
      };
    })
  );

  channel.send({ embeds: [tableEmbed] });
};

export const params = () => {
  return [];
};

export const description = () => "Shows timetable";
