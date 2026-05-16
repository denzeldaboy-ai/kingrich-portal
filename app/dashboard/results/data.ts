export type ResultRecord = {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  subject: string;
  score: number;
  grade: string;
  term: string;
  teacherName: string;
  remarks: string;
};

export const results: ResultRecord[] = [
  {
    id: "1",
    studentName: "Ama Owusu",
    studentId: "KA-2024-001",
    className: "Primary 3",
    subject: "Mathematics",
    score: 88,
    grade: "A",
    term: "Term 1",
    teacherName: "Mr. Daniel Mensah",
    remarks: "Excellent work",
  },
  {
    id: "2",
    studentName: "Kwame Mensah",
    studentId: "KA-2024-002",
    className: "JHS 1",
    subject: "English Language",
    score: 74,
    grade: "B",
    term: "Term 1",
    teacherName: "Mrs. Akosua Nartey",
    remarks: "Very good performance",
  },
  {
    id: "3",
    studentName: "Efua Asante",
    studentId: "KA-2024-003",
    className: "Crèche A",
    subject: "Literacy",
    score: 91,
    grade: "A",
    term: "Term 1",
    teacherName: "Mrs. Mary Asante",
    remarks: "Outstanding progress",
  },
];