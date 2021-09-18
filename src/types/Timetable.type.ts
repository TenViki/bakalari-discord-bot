export interface Timetable {
  Hours: Hour[];
  Days: Day[];
  Classes: DataType[];
  Groups: Group[];
  Subjects: DataType[];
  Teachers: DataType[];
  Rooms: DataType[];
  Cycles: DataType[];
}

interface DataType {
  Id: string;
  Abbrev: string;
  Name: string;
}

interface Group {
  Id: string;
  Abbrev: string;
  Name: string;
  ClassId: string;
}

interface Day {
  Atoms: Atom[];
  DayOfWeek: number;
  Date: Date;
  DayDescription: string;
  DayType: string;
}

interface Atom {
  HourId: number;
  GroupIds: string[];
  SubjectId: null | string;
  TeacherId: null | string;
  RoomId: null | string;
  CycleIds: string[];
  Change: Change | null;
  HomeworkIds: any[];
  Theme: null | string;
}

interface Change {
  ChangeSubject: null;
  Day: Date;
  Hours: string;
  ChangeType: "Canceled" | "Added" | "Removed" | "RoomChanged" | "Substitution";
  Description: string;
  Time: string;
  TypeAbbrev: null | string;
  TypeName: null | string;
}

interface Hour {
  Id: number;
  Caption: string;
  BeginTime: string;
  EndTime: string;
}
