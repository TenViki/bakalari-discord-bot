import axios from "axios";
import { MarksType } from "../types/Marks.Type";

export const getMarks = async (
  accessToken: string,
  url: string
): Promise<MarksType | null> => {
  try {
    const res = await axios.get<MarksType>(url + "api/3/marks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (ex) {
    return null;
  }
};
