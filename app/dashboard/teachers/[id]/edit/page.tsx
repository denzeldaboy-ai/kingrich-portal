"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";

export default function EditTeacherPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [teacher, setTeacher] = useState<any | null>(null);
  const [isFetchingTeacher, setIsFetchingTeacher] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    staffId: "",
    subject: "",
    email: "",
    phone: "",
    gender: "",
    qualification: "",
    status: "",
    address: "",
    dateJoined: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchTeacher() {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Teacher fetch error:", error.message);
        setTeacher(null);
      } else {
        setTeacher(data);
      }

      setIsFetchingTeacher(false);
    }

    fetchTeacher();
  }, [id]);

  useEffect(() => {
    if (!teacher) return;

    setFormData({
      fullName: teacher.fullName ?? "",
      staffId: teacher.staffId ?? "",
      subject: teacher.subject ?? "",
      email: teacher.email ?? "",
      phone: teacher.phone ?? "",
      gender: teacher.gender ?? "",
      qualification: teacher.qualification ?? "",
      status: teacher.status ?? "Active",
      address: teacher.address ?? "",
      dateJoined: teacher.dateJoined ?? "",
      notes: teacher.notes ?? "",
    });
  }, [teacher]);

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

    if (!teacher) return;

    const { error } = await supabase
      .from("teachers")
      .update({
        fullName: formData.fullName,
        staffId: formData.staffId,
        subject: formData.subject,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        qualification: formData.qualification,
        status: formData.status,
        address: formData.address,
        dateJoined: formData.dateJoined,
        notes: formData.notes,
      })
      .eq("id", teacher.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Teacher changes saved successfully.");
    router.push(`/dashboard/teachers/${id}`);
  };

  if (isFetchingTeacher) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading teacher...
      </div>
    );
  }

  if (!teacher) {
    return <div className="text-sm text-red-600">Teacher not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Edit Teacher</p>
            <h1 className="mt-1 text-3xl font-bold">Edit Teacher</h1>
            <p className="mt-2 text-sm text-white/90">
              Update teacher information and staff details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/teachers/${teacher.id}`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              Back to Profile
            </Link>

            <Link
              href="/dashboard/teachers"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Back to Teachers
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
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName ?? ""}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Staff ID
            </label>
            <input
              type="text"
              name="staffId"
              value={formData.staffId ?? ""}
              onChange={handleChange}
              placeholder="Enter staff ID"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject ?? ""}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone ?? ""}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification ?? ""}
              onChange={handleChange}
              placeholder="Example: B.Ed Mathematics"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Date Joined
            </label>
            <input
              type="date"
              name="dateJoined"
              value={formData.dateJoined ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
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
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address ?? ""}
              onChange={handleChange}
              placeholder="Enter teacher address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes ?? ""}
              onChange={handleChange}
              placeholder="Additional notes about this teacher..."
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
            href={`/dashboard/teachers/${teacher.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}