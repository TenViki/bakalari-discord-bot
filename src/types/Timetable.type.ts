export interface Subject {
  end?: boolean;
  name: string;
  teacher?: string;
  room?: string;
  time: string;
  changeInfo?: string;
}

export interface Timetable {
  subjects: Subject[];
  date: string;
}
