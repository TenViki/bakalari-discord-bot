import { model, Schema } from "mongoose";
import { Guild } from "../types/Guild.Type";

const guildSchema = new Schema<Guild>({
  guildId: {
    type: String,
    required: true,
  },
  bakaUrl: {
    type: String,
  },
  logChannel: {
    type: String,
  },
  timetableChannel: {
    type: String,
  },
  timetableTimes: {
    type: String,
  },
});

export default model("server", guildSchema);
