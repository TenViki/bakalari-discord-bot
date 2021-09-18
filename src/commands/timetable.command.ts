import { CommandHandler } from "../types/Command.Type";
import { Timetable } from "../types/Timetable.Type";
import { createEmbed } from "../utils/embed";
import { processTimetable } from "../utils/timetable";

export const run: CommandHandler = async (i, guild) => {
  const [tt, user] = await processTimetable(i, guild);
  if (!tt || !user) return;

  const timetable = new Timetable(tt);

  const day = timetable.getSubjectsForToday();

  const date = new Date(day.Date);

  const embed = createEmbed(
    i.user,
    `Rozvrh hodin ${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`,
    `Rozvrh hodin pro uživatele ${i.user.username}`
  ).addFields(
    day.Atoms.map((e) => {
      const subject = timetable.getSubject(e.SubjectId ?? "")!;
      const hour = timetable.getHour(e.HourId)!;

      return {
        name: `${hour.Caption}. ${subject.Name ?? "UNDEFINED"} (${
          hour.BeginTime
        } - ${hour.EndTime})`,
        value: `${e.Theme ? "*" + e.Theme + "* \n" : ""}${
          timetable.getRoom(e.RoomId ?? "")?.Abbrev
        } | ${timetable.getTeacher(e.TeacherId ?? "")?.Name}${
          e.Change ? "\n**" + e.Change.Description + "**" : ""
        }`,
      };
    })
  );

  i.reply({ embeds: [embed] });
};

export const params = () => {
  return [];
};

export const description = () => "Shows timetable";
