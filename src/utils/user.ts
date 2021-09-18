import { UserType } from "../types/User.Type";
import UserModel from "../schema/User.Schema";

export const getUser = async (guildId: string, userId: string) => {
  return UserModel.findOne({
    guildId,
    discordId: userId,
  });
};
