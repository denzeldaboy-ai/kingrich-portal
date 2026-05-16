"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  FileBarChart2,
  User,
  BadgeInfo,
  Layers3,
  BookOpen,
  CalendarDays,
  Award,
  ClipboardList,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function ResultProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [result, setResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Result profile fetch error:", error.message);
        setResult(null);
      } else {
        setResult(data);
      }

      setIsLoading(false);
    }

    fetchResult();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading result...
      </div>
    );
  }

  if (!result) {
    return <div className="text-sm text-red-600">Result not found.</div>;
  }

  const score = Number(result.score || 0);

  const infoCards = [
    {
      label: "Student",
      value: result.studentName ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Class",
      value: result.className ?? "Not provided",
      icon: <Layers3 className="h-5 w-5" />,
    },
    {
      label: "Subject",
      value: result.subject ?? "Not provided",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Score",
      value: score,
      icon: <Award className="h-5 w-5" />,
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
            <h1 className="mt-1 text-3xl font-bold">Result Record</h1>
            <p className="mt-2 text-sm text-white/90">
              View student score, grade, term, subject, and teacher remarks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/results"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>

            <Link
              href={`/dashboard/results/${result.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Result
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
            <FileBarChart2 className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Result Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Student Name" value={result.studentName} />
            <InfoRow label="Student ID" value={result.studentId} />
            <InfoRow label="Class" value={result.className} />
            <InfoRow label="Subject" value={result.subject} />
            <InfoRow label="Term" value={result.term} />
            <InfoRow label="Score" value={result.score} />
            <InfoRow label="Grade" value={result.grade} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Performance
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-sm font-medium text-slate-500">Grade</p>
              <p className="mt-2 text-5xl font-bold text-blue-700">
                {result.grade || "—"}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Score:{" "}
                <span className="font-semibold text-slate-900">
                  {score}/100
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Term</h2>
            </div>

            <InfoRow label="Academic Term" value={result.term} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">Remarks</h2>
        </div>

        <p className="text-sm text-slate-700">
          {result.remarks || "No remarks added for this result."}
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
        {value === 0 ? 0 : value || "Not provided"}
      </p>
    </div>
  );
}