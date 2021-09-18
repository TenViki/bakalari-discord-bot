import axios from "axios";
import { Timetable } from "../types/Timetable.Type";

export const getTimetable = async (
  accessToken: string,
  url: string
): Promise<Timetable | null> => {
  try {
    const res = await axios.get<Timetable>(url + "api/3/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (ex) {
    return null;
  }
};
