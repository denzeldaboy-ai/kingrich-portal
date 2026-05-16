"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function AddResultPage() {
  const router = useRouter();
  const { currentRole, isLoaded } = useCurrentRole();

  const canAddResult = currentRole === "admin" || currentRole === "teacher";

  useEffect(() => {
    if (!isLoaded) return;

    if (!canAddResult) {
      router.push("/dashboard");
    }
  }, [canAddResult, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  if (!canAddResult) {
    return null;
  }

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    className: "",
    subject: "",
    term: "",
    score: "",
    grade: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "score") {
        const score = Number(value);

        let grade = "";

        if (value === "") {
          grade = "";
        } else if (score >= 80) {
          grade = "A";
        } else if (score >= 70) {
          grade = "B";
        } else if (score >= 60) {
          grade = "C";
        } else if (score >= 50) {
          grade = "D";
        } else {
          grade = "F";
        }

        return {
          ...updated,
          grade,
        };
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from("results").insert([
      {
        studentName: formData.studentName,
        studentId: formData.studentId,
        className: formData.className,
        subject: formData.subject,
        term: formData.term,
        score: formData.score === "" ? 0 : Number(formData.score),
        grade: formData.grade,
        remarks: formData.remarks,
      },
    ]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Result added successfully.");
    router.push("/dashboard/results");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Add New Result</p>
            <h1 className="mt-1 text-3xl font-bold">Add New Result</h1>
            <p className="mt-2 text-sm text-white/90">
              Record a student&apos;s subject score, grade, and remarks.
            </p>
          </div>

          <Link
            href="/dashboard/results"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
          >
            Back to Results
          </Link>
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
              value={formData.studentName}
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
              value={formData.studentId}
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
            <select
              name="className"
              value={formData.className}
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
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Example: Mathematics"
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
              value={formData.term}
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
              Score
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              placeholder="Enter score"
              min="0"
              max="100"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Grade
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Auto-filled from score"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              readOnly
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter teacher remarks"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
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
            Save Result
          </button>

          <Link
            href="/dashboard/results"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}                         