"use client";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { students } from "../data";

export default function AddStudentPage() {
  const router = useRouter();
  const { currentRole, isLoaded } = useCurrentRole();
  
  useEffect(() => {
    if (!isLoaded) return;

    if (currentRole !== "admin") {
      router.push("/dashboard");
    }
  }, [currentRole, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  if (currentRole !== "admin") {
    return null;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    gender: "",
    dateOfBirth: "",
    admissionNumber: "",
    className: "",
    status: "",
    guardianName: "",
    guardianPhone: "",
  });

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

    const fullName = [
      formData.firstName,
      formData.otherName,
      formData.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.dateOfBirth ||
      !formData.admissionNumber ||
      !formData.className ||
      !formData.status ||
      !formData.guardianName ||
      !formData.guardianPhone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const storedStudents = JSON.parse(
      localStorage.getItem("kingrich-students") || "null"
    );

    const studentSource =
      storedStudents && storedStudents.length > 0 ? storedStudents : students;

    const newStudent = {
      id: Date.now().toString(),
      fullName,
      studentId: formData.admissionNumber,
      className: formData.className,
      gender: formData.gender,
      age: 0,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      status: formData.status as "Active" | "Pending" | "Inactive",
      address: "",
      dateOfBirth: formData.dateOfBirth,
      admissionDate: new Date().toISOString().split("T")[0],
      notes: "",
    };

    const updatedStudents = [...studentSource, newStudent];

    localStorage.setItem("kingrich-students", JSON.stringify(updatedStudents));
    const { data, error } = await supabase.from("students").insert([
      {
        fullName: fullName,
        studentId: formData.admissionNumber,
        className: formData.className,
        gender: formData.gender,
        guardianName: formData.guardianName,
        status: "Active",
      },
    ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
    }

    toast.success("Student added successfully.");
    router.push("/dashboard/students");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-950 px-6 py-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">Add New Student</p>
            <h1 className="text-3xl font-bold text-white">Add New Student</h1>
            <p className="mt-2 text-sm text-white/90">
              Create a new student record for Kingrich Academy.
            </p>
          </div>

          <Link
            href="/dashboard/students"
            className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            Back to Students
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Other Name
            </label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleChange}
              placeholder="Enter other name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Admission Number
            </label>
            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="Enter admission number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
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
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Guardian Name
            </label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="Enter guardian name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Guardian Phone
            </label>
            <input
              type="text"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
              placeholder="Enter guardian phone"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Save Student
          </button>

          <Link
            href="/dashboard/students"
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}