"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";

export default function EditAttendancePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [attendance, setAttendance] = useState<any | null>(null);
  const [isFetchingAttendance, setIsFetchingAttendance] = useState(true);

  const [formData, setFormData] = useState({
    date: "",
    className: "",
    classTeacher: "",
    totalStudents: "",
    present: "",
    absent: "",
    status: "",
  });

  useEffect(() => {
    async function fetchAttendance() {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Attendance fetch error:", error.message);
        setAttendance(null);
      } else {
        setAttendance(data);
      }

      setIsFetchingAttendance(false);
    }

    fetchAttendance();
  }, [id]);

  useEffect(() => {
    if (!attendance) return;

    setFormData({
      date: attendance.date ?? "",
      className: attendance.className ?? "",
      classTeacher: attendance.classTeacher ?? "",
      totalStudents:
        attendance.totalStudents === null ||
        attendance.totalStudents === undefined
          ? ""
          : String(attendance.totalStudents),
      present:
        attendance.present === null || attendance.present === undefined
          ? ""
          : String(attendance.present),
      absent:
        attendance.absent === null || attendance.absent === undefined
          ? ""
          : String(attendance.absent),
      status: attendance.status ?? "Completed",
    });
  }, [attendance]);

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

    if (!attendance) return;

    const { error } = await supabase
      .from("attendance")
      .update({
        date: formData.date,
        className: formData.className,
        classTeacher: formData.classTeacher,
        totalStudents:
          formData.totalStudents === "" ? 0 : Number(formData.totalStudents),
        present: formData.present === "" ? 0 : Number(formData.present),
        absent: formData.absent === "" ? 0 : Number(formData.absent),
        status: formData.status,
      })
      .eq("id", attendance.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Attendance changes saved successfully.");
    router.push(`/dashboard/attendance/${id}`);
  };

  if (isFetchingAttendance) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading attendance...
      </div>
    );
  }

  if (!attendance) {
    return <div className="text-sm text-red-600">Attendance not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Edit Attendance
            </p>
            <h1 className="mt-1 text-3xl font-bold">Edit Attendance</h1>
            <p className="mt-2 text-sm text-white/90">
              Update the daily attendance summary for this class.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/attendance/${attendance.id}`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              Back to Record
            </Link>

            <Link
              href="/dashboard/attendance"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Back to Attendance
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
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class
            </label>
            <select
              name="className"
              value={formData.className ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Select class</option>
              <option value="Crèche">Crèche</option>
              <option value="Nursery 1">Nursery 1</option>
              <option value="Nursery 2">Nursery 2</option>
              <option value="KG 1">KG 1</option>
              <option value="KG 2">KG 2</option>
              <option value="Primary 1">Primary 1</option>
              <option value="Primary 2">Primary 2</option>
              <option value="Primary 3">Primary 3</option>
              <option value="Primary 4">Primary 4</option>
              <option value="Primary 5">Primary 5</option>
              <option value="Primary 6">Primary 6</option>
              <option value="JHS 1">JHS 1</option>
              <option value="JHS 2">JHS 2</option>
              <option value="JHS 3">JHS 3</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class Teacher
            </label>
            <input
              type="text"
              name="classTeacher"
              value={formData.classTeacher ?? ""}
              onChange={handleChange}
              placeholder="Enter teacher name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Total Students
            </label>
            <input
              type="number"
              name="totalStudents"
              value={formData.totalStudents ?? ""}
              onChange={handleChange}
              placeholder="Enter total students"
              min="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Present
            </label>
            <input
              type="number"
              name="present"
              value={formData.present ?? ""}
              onChange={handleChange}
              placeholder="Enter present count"
              min="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Absent
            </label>
            <input
              type="number"
              name="absent"
              value={formData.absent ?? ""}
              onChange={handleChange}
              placeholder="Enter absent count"
              min="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
            </select>
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
            href={`/dashboard/attendance/${attendance.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}