"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  Megaphone,
  Users,
  CalendarDays,
  User,
  BadgeInfo,
  ClipboardList,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function AnnouncementProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [announcement, setAnnouncement] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Announcement profile fetch error:", error.message);
        setAnnouncement(null);
      } else {
        setAnnouncement(data);
      }

      setIsLoading(false);
    }

    fetchAnnouncement();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading announcement...
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="text-sm text-red-600">Announcement not found.</div>
    );
  }

  const infoCards = [
    {
      label: "Audience",
      value: announcement.audience ?? "Not provided",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Date",
      value: announcement.date ?? "Not provided",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      label: "Author",
      value: announcement.author ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Status",
      value: announcement.status ?? "Not provided",
      icon: <BadgeInfo className="h-5 w-5" />,
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
              {announcement.title || "Announcement"}
            </h1>
            <p className="mt-2 text-sm text-white/90">
              View announcement details, audience, author, and content.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/announcements"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Announcements
            </Link>

            <Link
              href={`/dashboard/announcements/${announcement.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Announcement
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
            <Megaphone className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Announcement Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Title" value={announcement.title} />
            <InfoRow label="Audience" value={announcement.audience} />
            <InfoRow label="Date" value={announcement.date} />
            <InfoRow label="Author" value={announcement.author} />
            <InfoRow label="Status" value={announcement.status} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <BadgeInfo className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">Status</h2>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              announcement.status === "Published"
                ? "bg-green-100 text-green-700"
                : announcement.status === "Draft"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {announcement.status || "Unknown"}
          </span>

          <p className="mt-4 text-sm text-slate-600">
            This announcement is for{" "}
            <span className="font-semibold text-slate-900">
              {announcement.audience || "the selected audience"}
            </span>
            .
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-700" />
          <h2 className="text-lg font-bold text-slate-900">Content</h2>
        </div>

        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {announcement.content || "No content added for this announcement."}
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