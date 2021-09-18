import axios from "axios";
import { TimetableType } from "../types/Timetable.Type";

export const getTimetable = async (
  accessToken: string,
  url: string,
  date: Date
): Promise<TimetableType | null> => {
  try {
    const res = await axios.get<TimetableType>(
      url +
        `api/3/timetable/actual?date=${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (ex) {
    return null;
  }
};
