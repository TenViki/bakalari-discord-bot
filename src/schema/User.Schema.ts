import { model, Schema } from "mongoose";

const userSchema = new Schema({
  discordId: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

export default model("server", userSchema);
