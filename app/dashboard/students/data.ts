export type Student = {
  id: string;
  fullName: string;
  studentId: string;
  className: string;
  gender: string;
  age: number;
  guardianName: string;
  guardianPhone: string;
  status: "Active" | "Pending" | "Inactive";
  address: string;
  dateOfBirth: string;
  admissionDate: string;
  notes: string;
};

export const students: Student[] = [
  {
    id: "1",
    fullName: "Ama Owusu",
    studentId: "KA-2024-001",
    className: "Primary 3",
    gender: "Female",
    age: 8,
    guardianName: "Mrs. Akosua Owusu",
    guardianPhone: "+233 24 111 2222",
    status: "Active",
    address: "Dodowa, Accra",
    dateOfBirth: "2016-05-14",
    admissionDate: "2024-09-10",
    notes: "Very active in class and performs well in English.",
  },
  {
    id: "2",
    fullName: "Kwame Mensah",
    studentId: "KA-2024-002",
    className: "JHS 1",
    gender: "Male",
    age: 12,
    guardianName: "Mr. Kofi Mensah",
    guardianPhone: "+233 20 333 4444",
    status: "Active",
    address: "Saasabi, Near Dodowa",
    dateOfBirth: "2012-11-03",
    admissionDate: "2024-09-12",
    notes: "Strong in Mathematics. Needs improvement in handwriting.",
  },
  {
    id: "3",
    fullName: "Efua Asante",
    studentId: "KA-2024-003",
    className: "Creche",
    gender: "Female",
    age: 4,
    guardianName: "Mrs. Adwoa Asante",
    guardianPhone: "+233 55 888 9999",
    status: "Active",
    address: "Mensa Bar, Saasabi",
    dateOfBirth: "2020-02-08",
    admissionDate: "2025-01-15",
    notes: "Adapting well and enjoys group activities.",
  },
];
