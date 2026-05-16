"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  User,
  BadgeInfo,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function TeacherProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [teacher, setTeacher] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacher() {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Teacher profile fetch error:", error.message);
        setTeacher(null);
      } else {
        setTeacher(data);
      }

      setIsLoading(false);
    }

    fetchTeacher();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading teacher profile...
      </div>
    );
  }

  if (!teacher) {
    return <div className="text-sm text-red-600">Teacher not found.</div>;
  }

  const infoCards = [
    {
      label: "Staff ID",
      value: teacher.staffId ?? "Not provided",
      icon: <BadgeInfo className="h-5 w-5" />,
    },
    {
      label: "Subject",
      value: teacher.subject ?? "Not provided",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Status",
      value: teacher.status ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Date Joined",
      value: teacher.dateJoined ?? "Not provided",
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
              {teacher.fullName ?? "Teacher Profile"}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              View teacher profile, subject, contact, and staff details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/teachers"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Teachers
            </Link>

            <Link
              href={`/dashboard/teachers/${teacher.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Teacher
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
              Teacher Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Full Name" value={teacher.fullName} />
            <InfoRow label="Staff ID" value={teacher.staffId} />
            <InfoRow label="Subject" value={teacher.subject} />
            <InfoRow label="Gender" value={teacher.gender} />
            <InfoRow label="Qualification" value={teacher.qualification} />
            <InfoRow label="Date Joined" value={teacher.dateJoined} />
            <InfoRow label="Status" value={teacher.status} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Contact Details
              </h2>
            </div>

            <div className="space-y-4">
              <InfoRow
                label="Email"
                value={teacher.email}
                icon={<Mail className="h-4 w-4" />}
              />
              <InfoRow
                label="Phone"
                value={teacher.phone}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Address</h2>
            </div>

            <p className="text-sm text-slate-700">
              {teacher.address || "No address provided."}
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
          {teacher.notes || "No notes added for this teacher."}
        </p>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-500">{icon}</span>}
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}