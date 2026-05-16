"use client";

import { supabase } from "@/app/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  User,
  BadgeInfo,
  GraduationCap,
  CalendarDays,
  Phone,
  MapPin,
  ClipboardList,
} from "lucide-react";


export default function EditStudentPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [student, setStudent] = useState<any | null>(null);
  const [isFetchingStudent, setIsFetchingStudent] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Student fetch error:", error.message);
        setStudent(null);
      } else {
        setStudent(data);
      }

      setIsFetchingStudent(false);
    }

    fetchStudent();
  }, [id]);



  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    className: "",
    gender: "",
    age: "",
    dateOfBirth: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
    admissionDate: "",
    status: "Active" as "Active" | "Pending" | "Inactive",
    notes: "",
  });

  useEffect(() => {
    if (!student) return;

    setFormData({
      fullName: student.fullName ?? "",
      studentId: student.studentId ?? "",
      className: student.className ?? "",
      gender: student.gender ?? "",
      age: student.age != null ? String(student.age) : "",
      dateOfBirth: student.dateOfBirth ?? "",
      guardianName: student.guardianName ?? "",
      guardianPhone: student.guardianPhone ?? "",
      address: student.address ?? "",
      admissionDate: student.admissionDate ?? "",
      status: student.status ?? "Active",
      notes: student.notes ?? "",
    });
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!student) return;

    const { error } = await supabase
      .from("students")
      .update({
        fullName: formData.fullName,
        studentId: formData.studentId,
        className: formData.className,
        gender: formData.gender,
        age: formData.age === "" ? null : Number(formData.age),
        dateOfBirth: formData.dateOfBirth,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        address: formData.address,
        admissionDate: formData.admissionDate,
        status: formData.status,
        notes: formData.notes,
      })
      .eq("id", student.id);

    if (error) {
      alert(error.message);
      return;
    }

    toast.success("Student changes saved successfully.");
    router.push(`/dashboard/students/${id}`);
    };
  if (isFetchingStudent) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return <div className="text-sm text-red-600">Student not found.</div>;
  }
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Edit Student</p>
            <h1 className="mt-1 text-3xl font-bold">{student.fullName}</h1>
            <p className="mt-2 text-sm text-white/90">
              Update student information for Kingrich Academy Portal.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/students/${student.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>

            <div className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm">
              <PencilLine className="h-4 w-4" />
              Editing Record
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2">
          <BadgeInfo className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">
            Update Student Information
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <User className="h-4 w-4 text-slate-500" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BadgeInfo className="h-4 w-4 text-slate-500" />
              Student ID
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <GraduationCap className="h-4 w-4 text-slate-500" />
              Class
            </label>
            <input
              type="text"
              name="className"
              value={formData.className ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <User className="h-4 w-4 text-slate-500" />
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <User className="h-4 w-4 text-slate-500" />
              Guardian Name
            </label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Phone className="h-4 w-4 text-slate-500" />
              Guardian Phone
            </label>
            <input
              type="text"
              name="guardianPhone"
              value={formData.guardianPhone ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin className="h-4 w-4 text-slate-500" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              Admission Date
            </label>
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BadgeInfo className="h-4 w-4 text-slate-500" />
              Status
            </label>
            <select
              name="status"
              value={formData.status ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <ClipboardList className="h-4 w-4 text-slate-500" />
              Notes
            </label>
            <textarea
              name="notes"
              rows={5}
              value={formData.notes ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <PencilLine className="h-4 w-4" />
            Save Changes
          </button>

          <Link
            href={`/dashboard/students/${student.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}