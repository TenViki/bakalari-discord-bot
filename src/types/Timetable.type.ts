export class Timetable {
  public hours;
  public days;
  public classes;
  public groups;
  public subjects;
  public teachers;
  public rooms;
  public cycles;
  constructor(timetable: TimetableType) {
    this.hours = timetable.Hours;
    this.days = timetable.Days;
    this.classes = timetable.Classes;
    this.groups = timetable.Groups;
    this.subjects = timetable.Subjects;
    this.teachers = timetable.Teachers;
    this.rooms = timetable.Rooms;
    this.cycles = timetable.Cycles;
  }

  getSubjectsForToday() {
    const date = new Date();
    if (date.getHours() >= 15) date.setDate(date.getDate() + 1);

    let day = this.days.find(
      (e) => new Date(e.Date).getDate() === date.getDate()
    );
    if (!day) day = this.days[0];
    return day;
  }

  getSubject(id: string) {
    return this.subjects.find((e) => e.Id === id);
  }

  getHour(id: number) {
    return this.hours.find((e) => e.Id === id);
  }

  getRoom(id: string) {
    return this.rooms.find((e) => e.Id === id);
  }

  getTeacher(id: string) {
    return this.teachers.find((e) => e.Id === id);
  }
}

export interface TimetableType {
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
