export type Teacher = {
  id: string;
  fullName: string;
  staffId: string;
  subject: string;
  phone: string;
  email: string;
  status: "Active" | "On Leave" | "Inactive";
  gender: string;
  address: string;
  qualification: string;
  notes: string;
};

export const teachers: Teacher[] = [
  {
    id: "1",
    fullName: "Mr. Daniel Mensah",
    staffId: "KA-TCH-001",
    subject: "Mathematics",
    phone: "+233 24 111 2222",
    email: "daniel.mensah@kingrichacademy.edu.gh",
    status: "Active",
    gender: "Male",
    address: "Dodowa, Accra",
    qualification: "B.Ed Mathematics",
    notes: "Excellent classroom management and strong exam preparation skills.",
  },
  {
    id: "2",
    fullName: "Mrs. Akosua Nartey",
    staffId: "KA-TCH-002",
    subject: "English Language",
    phone: "+233 20 333 4444",
    email: "akosua.nartey@kingrichacademy.edu.gh",
    status: "Active",
    gender: "Female",
    address: "Saasabi, Accra",
    qualification: "B.A English, PGDE",
    notes: "Leads reading improvement sessions for upper primary students.",
  },
  {
    id: "3",
    fullName: "Mr. Samuel Owusu",
    staffId: "KA-TCH-003",
    subject: "Integrated Science",
    phone: "+233 55 888 9999",
    email: "samuel.owusu@kingrichacademy.edu.gh",
    status: "On Leave",
    gender: "Male",
    address: "Mensa Bar, Near Dodowa",
    qualification: "B.Sc Science Education",
    notes: "Currently on short academic leave.",
  },
];