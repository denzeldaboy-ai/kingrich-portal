export type SchoolClass = {
  id: string;
  name: string;
  level: string;
  classTeacher: string;
  studentsCount: number;
  status: "Active" | "Full" | "Inactive";
  room: string;
  notes: string;
};

export const classes: SchoolClass[] = [
  {
    id: "1",
    name: "Crèche A",
    level: "Crèche",
    classTeacher: "Mrs. Mary Asante",
    studentsCount: 18,
    status: "Active",
    room: "Block A - Room 1",
    notes: "Early childhood foundational class.",
  },
  {
    id: "2",
    name: "Primary 3",
    level: "Primary",
    classTeacher: "Mr. Daniel Mensah",
    studentsCount: 27,
    status: "Active",
    room: "Block B - Room 4",
    notes: "Strong performance in English and Maths.",
  },
  {
    id: "3",
    name: "JHS 1",
    level: "JHS",
    classTeacher: "Mrs. Akosua Nartey",
    studentsCount: 31,
    status: "Full",
    room: "Block C - Room 2",
    notes: "Exam preparation class with high enrollment.",
  },
];