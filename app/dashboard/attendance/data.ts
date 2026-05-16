export type AttendanceRecord = {
  id: string;
  date: string;
  className: string;
  teacherName: string;
  totalStudents: number;
  present: number;
  absent: number;
  status: "Completed" | "Pending";
};

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    date: "2026-04-10",
    className: "Primary 3",
    teacherName: "Mr. Daniel Mensah",
    totalStudents: 27,
    present: 25,
    absent: 2,
    status: "Completed",
  },
  {
    id: "2",
    date: "2026-04-10",
    className: "JHS 1",
    teacherName: "Mrs. Akosua Nartey",
    totalStudents: 31,
    present: 29,
    absent: 2,
    status: "Completed",
  },
  {
    id: "3",
    date: "2026-04-10",
    className: "Crèche A",
    teacherName: "Mrs. Mary Asante",
    totalStudents: 18,
    present: 0,
    absent: 0,
    status: "Pending",
  },
];