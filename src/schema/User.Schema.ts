import { model, Schema } from "mongoose";
import { UserType } from "../types/User.Type";

const userSchema = new Schema<UserType>({
  discordId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default model("user", userSchema);
