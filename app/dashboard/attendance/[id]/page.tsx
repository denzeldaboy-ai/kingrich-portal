"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  CalendarCheck2,
  CalendarDays,
  Layers3,
  User,
  Users,
  CheckCircle2,
  UserX,
  ClipboardList,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function AttendanceProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [attendance, setAttendance] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Attendance profile fetch error:", error.message);
        setAttendance(null);
      } else {
        setAttendance(data);
      }

      setIsLoading(false);
    }

    fetchAttendance();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading attendance record...
      </div>
    );
  }

  if (!attendance) {
    return <div className="text-sm text-red-600">Attendance not found.</div>;
  }

  const totalStudents = Number(attendance.totalStudents || 0);
  const present = Number(attendance.present || 0);
  const absent = Number(attendance.absent || 0);

  const attendanceRate =
    totalStudents > 0 ? Math.round((present / totalStudents) * 100) : 0;

  const infoCards = [
    {
      label: "Date",
      value: attendance.date ?? "Not provided",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      label: "Class",
      value: attendance.className ?? "Not provided",
      icon: <Layers3 className="h-5 w-5" />,
    },
    {
      label: "Present",
      value: present,
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      label: "Absent",
      value: absent,
      icon: <UserX className="h-5 w-5" />,
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
              Attendance Record
            </h1>
            <p className="mt-2 text-sm text-white/90">
              View daily attendance summary for this class.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/attendance"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Attendance
            </Link>

            <Link
              href={`/dashboard/attendance/${attendance.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Attendance
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
            <CalendarCheck2 className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Attendance Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Date" value={attendance.date} />
            <InfoRow label="Class" value={attendance.className} />
            <InfoRow label="Class Teacher" value={attendance.classTeacher} />
            <InfoRow label="Total Students" value={attendance.totalStudents} />
            <InfoRow label="Present" value={attendance.present} />
            <InfoRow label="Absent" value={attendance.absent} />
            <InfoRow label="Status" value={attendance.status} />
            <InfoRow label="Attendance Rate" value={`${attendanceRate}%`} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Summary
              </h2>
            </div>

            <div className="space-y-4">
              <InfoRow label="Total Students" value={totalStudents} />
              <InfoRow label="Present Students" value={present} />
              <InfoRow label="Absent Students" value={absent} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Status</h2>
            </div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                attendance.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : attendance.status === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {attendance.status || "Unknown"}
            </span>

            <p className="mt-4 text-sm text-slate-600">
              Attendance rate for this record is{" "}
              <span className="font-semibold text-slate-900">
                {attendanceRate}%
              </span>
              .
            </p>
          </div>
        </div>
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
        {value === 0 ? 0 : value || "Not provided"}
      </p>
    </div>
  );
}
