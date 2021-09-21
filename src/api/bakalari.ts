import axios from "axios";

export const getPing = async (url: string): Promise<number> => {
  const timestamp = Date.now();
  await axios.get(url);
  return Date.now() - timestamp;
};
