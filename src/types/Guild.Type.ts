export interface Guild {
  guildId: string;
  prefix: string;
  bakaUrl?: string;
  logChannel?: string;
  timetableChannel?: string;
  timetableTimes?: string[];
}

export type PrefixList = {
  guildId: string;
  prefix: string;
}[];
