"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { supabase } from "@/app/lib/supabase";

export default function StudentProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [student, setStudent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Student profile fetch error:", error.message);
        setStudent(null);
      } else {
        setStudent(data);
      }

      setIsLoading(false);
    }

    fetchStudent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading student profile...
      </div>
    );
  }

  if (!student) {
    return <div className="text-sm text-red-600">Student not found.</div>;
  }

  const infoCards = [
    {
      label: "Student ID",
      value: student.studentId ?? "Not provided",
      icon: <BadgeInfo className="h-5 w-5" />,
    },
    {
      label: "Class",
      value: student.className ?? "Not provided",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      label: "Gender",
      value: student.gender ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Age",
      value: student.age ?? "Not provided",
      icon: <CalendarDays className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">
              {student.fullName ?? "Student Profile"}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              View student academic and guardian information.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/students"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </Link>

            <Link
              href={`/dashboard/students/${student.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Student
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {infoCards.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {item.value}
                </h3>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Student Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Full Name" value={student.fullName} />
            <InfoRow label="Student ID" value={student.studentId} />
            <InfoRow label="Class" value={student.className} />
            <InfoRow label="Gender" value={student.gender} />
            <InfoRow label="Age" value={student.age} />
            <InfoRow label="Date of Birth" value={student.dateOfBirth} />
            <InfoRow label="Admission Date" value={student.admissionDate} />
            <InfoRow label="Status" value={student.status} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Guardian Details
              </h2>
            </div>

            <div className="space-y-4">
              <InfoRow label="Guardian Name" value={student.guardianName} />
              <InfoRow label="Guardian Phone" value={student.guardianPhone} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Address</h2>
            </div>

            <p className="text-sm text-slate-700">
              {student.address || "No address provided."}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">Notes</h2>
        </div>

        <p className="text-sm text-slate-700">
          {student.notes || "No notes added for this student."}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}