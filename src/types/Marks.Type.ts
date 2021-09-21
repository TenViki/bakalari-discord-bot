export interface MarksType {
  Subjects: Subject[];
  MarkOptions: MarkOption[];
}

export interface MarkOption {
  Id: string;
  Abbrev: string;
  Name: string;
}

export interface Subject {
  Marks: Mark[];
  Subject: MarkOption;
  AverageText: string;
  TemporaryMark: string;
  SubjectNote: string;
  TemporaryMarkNote: string;
  PointsOnly: boolean;
  MarkPredictionEnabled: boolean;
}

export interface Mark {
  MarkDate: Date;
  EditDate: Date;
  Caption: string;
  Theme: string;
  MarkText: string;
  TeacherId: string;
  Type: string;
  TypeNote: string;
  Weight: number;
  SubjectId: string;
  IsNew: boolean;
  IsPoints: boolean;
  CalculatedMarkText: string;
  ClassRankText: string;
  Id: string;
  PointsText: string;
  MaxPoints: number;
}
