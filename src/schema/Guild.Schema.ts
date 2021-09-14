import { model, Schema } from "mongoose";
import { Guild } from "../types/Guild.Type";

const guildSchema = new Schema<Guild>({
  guildId: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default: "bk!",
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
  timetableTimes: [
    {
      type: String,
    },
  ],
});

export default model("server", guildSchema);
