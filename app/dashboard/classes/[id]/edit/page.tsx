"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";

export default function EditClassPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [classItem, setClassItem] = useState<any | null>(null);
  const [isFetchingClass, setIsFetchingClass] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    classTeacher: "",
    studentsCount: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchClass() {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Class fetch error:", error.message);
        setClassItem(null);
      } else {
        setClassItem(data);
      }

      setIsFetchingClass(false);
    }

    fetchClass();
  }, [id]);

  useEffect(() => {
    if (!classItem) return;

    setFormData({
      name: classItem.name ?? "",
      level: classItem.level ?? "",
      classTeacher: classItem.classTeacher ?? "",
      studentsCount:
        classItem.studentsCount === null || classItem.studentsCount === undefined
          ? ""
          : String(classItem.studentsCount),
      status: classItem.status ?? "Active",
      notes: classItem.notes ?? "",
    });
  }, [classItem]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!classItem) return;

    const { error } = await supabase
      .from("classes")
      .update({
        name: formData.name,
        level: formData.level,
        classTeacher: formData.classTeacher,
        studentsCount:
          formData.studentsCount === "" ? 0 : Number(formData.studentsCount),
        status: formData.status,
        notes: formData.notes,
      })
      .eq("id", classItem.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Class changes saved successfully.");
    router.push(`/dashboard/classes/${id}`);
  };

  if (isFetchingClass) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading class...
      </div>
    );
  }

  if (!classItem) {
    return <div className="text-sm text-red-600">Class not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Edit Class</p>
            <h1 className="mt-1 text-3xl font-bold">Edit Class</h1>
            <p className="mt-2 text-sm text-white/90">
              Update class information, teacher assignment, and class status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/classes/${classItem.id}`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              Back to Profile
            </Link>

            <Link
              href="/dashboard/classes"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Back to Classes
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
              Class Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
              placeholder="Enter class name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Level
            </label>
            <select
              name="level"
              value={formData.level ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Select level</option>
              <option value="Crèche">Crèche</option>
              <option value="Nursery">Nursery</option>
              <option value="KG">KG</option>
              <option value="Primary">Primary</option>
              <option value="JHS">JHS</option>
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
              placeholder="Enter class teacher name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Students Count
            </label>
            <input
              type="number"
              name="studentsCount"
              value={formData.studentsCount ?? ""}
              onChange={handleChange}
              placeholder="Enter number of students"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
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
              <option value="Active">Active</option>
              <option value="Full">Full</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes ?? ""}
              onChange={handleChange}
              placeholder="Add any notes about this class"
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
            Save Changes
          </button>

          <Link
            href={`/dashboard/classes/${classItem.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}