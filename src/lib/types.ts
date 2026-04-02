export interface SubjectEntry {
  id: string;
  name: string;
  task: string;
}

export interface HomeworkTemplate {
  id: string;
  name: string;
  className: string;
  subjects: SubjectEntry[];
  createdAt: string;
}

export const SUBJECT_OPTIONS = [
  "Maths",
  "English",
  "English(gr)",
  "Hindi",
  "EVS",
  "Science",
  "Social Studies",
  "Computer",
  "GK",
  "Drawing",
  "Moral Science",
  "Sanskrit",
  "Urdu",
  "Sports",
  "Other",
];

export const CLASS_OPTIONS = [
  "Nursery",
  "LKG",
  "UKG",
  " 1",
  " 2",
  " 3",
  " 4",
  " 5",
];
