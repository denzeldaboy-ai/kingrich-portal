"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  Layers3,
  BadgeInfo,
  User,
  Users,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function ClassProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [classItem, setClassItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchClass() {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Class profile fetch error:", error.message);
        setClassItem(null);
      } else {
        setClassItem(data);
      }

      setIsLoading(false);
    }

    fetchClass();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading class profile...
      </div>
    );
  }

  if (!classItem) {
    return <div className="text-sm text-red-600">Class not found.</div>;
  }

  const infoCards = [
    {
      label: "Class Name",
      value: classItem.name ?? "Not provided",
      icon: <Layers3 className="h-5 w-5" />,
    },
    {
      label: "Level",
      value: classItem.level ?? "Not provided",
      icon: <BadgeInfo className="h-5 w-5" />,
    },
    {
      label: "Class Teacher",
      value: classItem.classTeacher ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Students",
      value: classItem.studentsCount ?? 0,
      icon: <Users className="h-5 w-5" />,
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
              {classItem.name ?? "Class Profile"}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              View class details, teacher assignment, and student count.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/classes"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Classes
            </Link>

            <Link
              href={`/dashboard/classes/${classItem.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Class
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
            <Layers3 className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Class Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Class Name" value={classItem.name} />
            <InfoRow label="Level" value={classItem.level} />
            <InfoRow label="Class Teacher" value={classItem.classTeacher} />
            <InfoRow label="Students Count" value={classItem.studentsCount} />
            <InfoRow label="Status" value={classItem.status} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">Status</h2>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              classItem.status === "Active"
                ? "bg-green-100 text-green-700"
                : classItem.status === "Full"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {classItem.status || "Unknown"}
          </span>

          <p className="mt-4 text-sm text-slate-600">
            This class currently has{" "}
            <span className="font-semibold text-slate-900">
              {classItem.studentsCount ?? 0}
            </span>{" "}
            student{Number(classItem.studentsCount || 0) === 1 ? "" : "s"}.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">Notes</h2>
        </div>

        <p className="text-sm text-slate-700">
          {classItem.notes || "No notes added for this class."}
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