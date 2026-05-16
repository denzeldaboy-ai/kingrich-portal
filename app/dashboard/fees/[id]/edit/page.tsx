"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";

export default function EditPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [fee, setFee] = useState<any | null>(null);
  const [isFetchingFee, setIsFetchingFee] = useState(true);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    className: "",
    term: "",
    amountDue: "",
    amountPaid: "",
  });

  useEffect(() => {
    async function fetchFee() {
      const { data, error } = await supabase
        .from("fees")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Fee fetch error:", error.message);
        setFee(null);
      } else {
        setFee(data);
      }

      setIsFetchingFee(false);
    }

    fetchFee();
  }, [id]);

  useEffect(() => {
    if (!fee) return;

    setFormData({
      studentName: fee.studentName ?? "",
      studentId: fee.studentId ?? "",
      className: fee.className ?? "",
      term: fee.term ?? "",
      amountDue:
        fee.amountDue === null || fee.amountDue === undefined
          ? ""
          : String(fee.amountDue),
      amountPaid:
        fee.amountPaid === null || fee.amountPaid === undefined
          ? ""
          : String(fee.amountPaid),
    });
  }, [fee]);

  const calculateStatus = (amountDue: number, amountPaid: number) => {
    const balance = amountDue - amountPaid;

    if (amountPaid <= 0) return "Unpaid";
    if (balance <= 0) return "Paid";

    return "Partial";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fee) return;

    const amountDue =
      formData.amountDue === "" ? 0 : Number(formData.amountDue);

    const amountPaid =
      formData.amountPaid === "" ? 0 : Number(formData.amountPaid);

    const balance = amountDue - amountPaid;
    const status = calculateStatus(amountDue, amountPaid);

    const { error } = await supabase
      .from("fees")
      .update({
        studentName: formData.studentName,
        studentId: formData.studentId,
        className: formData.className,
        term: formData.term,
        amountDue,
        amountPaid,
        balance,
        status,
      })
      .eq("id", fee.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Payment changes saved successfully.");
    router.push(`/dashboard/fees/${id}`);
  };

  if (isFetchingFee) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading payment record...
      </div>
    );
  }

  if (!fee) {
    return <div className="text-sm text-red-600">Payment record not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Edit Payment</p>
            <h1 className="mt-1 text-3xl font-bold">Edit Payment</h1>
            <p className="mt-2 text-sm text-white/90">
              Update student payment information and fee balance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/fees/${fee.id}`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              Back to Payment
            </Link>

            <Link
              href="/dashboard/fees"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Back to Fees
            </Link>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName ?? ""}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Student ID
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId ?? ""}
              onChange={handleChange}
              placeholder="Enter student ID"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class
            </label>
            <input
              type="text"
              name="className"
              value={formData.className ?? ""}
              onChange={handleChange}
              placeholder="Enter class name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Term
            </label>
            <select
              name="term"
              value={formData.term ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Select term</option>
              <option value="First Term">First Term</option>
              <option value="Second Term">Second Term</option>
              <option value="Third Term">Third Term</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Amount Due
            </label>
            <input
              type="number"
              name="amountDue"
              value={formData.amountDue ?? ""}
              onChange={handleChange}
              placeholder="Enter total amount due"
              min="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Amount Paid
            </label>
            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid ?? ""}
              onChange={handleChange}
              placeholder="Enter amount paid"
              min="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-bold text-slate-900">Auto Summary</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <SummaryItem
              label="Amount Due"
              value={formData.amountDue === "" ? 0 : Number(formData.amountDue)}
            />
            <SummaryItem
              label="Amount Paid"
              value={
                formData.amountPaid === "" ? 0 : Number(formData.amountPaid)
              }
            />
            <SummaryItem
              label="Balance"
              value={
                (formData.amountDue === "" ? 0 : Number(formData.amountDue)) -
                (formData.amountPaid === "" ? 0 : Number(formData.amountPaid))
              }
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="submit"
            style={{
              backgroundColor: "#1e40af",
              color: "white",
              border: "none",
              opacity: 1,
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:brightness-90"
          >
            <Save className="h-4 w-4" style={{ color: "white" }} />
            Save Changes
          </button>

          <Link
            href={`/dashboard/fees/${fee.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}