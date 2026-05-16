export type FeeRecord = {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  term: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  status: "Paid" | "Partial" | "Overdue";
};

export const feeRecords: FeeRecord[] = [
  {
    id: "1",
    studentName: "Ama Owusu",
    studentId: "KA-2024-001",
    className: "Primary 3",
    term: "Term 1",
    amountDue: 2500,
    amountPaid: 2500,
    balance: 0,
    status: "Paid",
  },
  {
    id: "2",
    studentName: "Kwame Mensah",
    studentId: "KA-2024-002",
    className: "JHS 1",
    term: "Term 1",
    amountDue: 3000,
    amountPaid: 2000,
    balance: 1000,
    status: "Partial",
  },
  {
    id: "3",
    studentName: "Efua Asante",
    studentId: "KA-2024-003",
    className: "Crèche A",
    term: "Term 1",
    amountDue: 1800,
    amountPaid: 0,
    balance: 1800,
    status: "Overdue",
  },
];