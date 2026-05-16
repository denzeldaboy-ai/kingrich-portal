"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Megaphone, Users, CheckCircle2, Clock3 } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function AnnouncementsPage() {
  const { currentRole, isLoaded } = useCurrentRole();

  const [announcementList, setAnnouncementList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*");

      if (error) {
        console.log("Error fetching announcements:", error.message);
      } else {
        setAnnouncementList(data || []);
      }
    };

    fetchAnnouncements();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading announcements...
      </div>
    );
  }

  const canManageAnnouncements = currentRole === "admin";

  const handleDeleteAnnouncement = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setAnnouncementList((prev) =>
      prev.filter((announcement) => announcement.id !== id)
    );
  };

  const audienceOptions = useMemo(() => {
    const audiences = Array.from(
      new Set(announcementList.map((item) => item.audience).filter(Boolean))
    );

    return ["All", ...audiences];
  }, [announcementList]);

  const filteredAnnouncements = useMemo(() => {
    return announcementList.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAudience =
        audienceFilter === "All" || item.audience === audienceFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesAudience && matchesStatus;
    });
  }, [announcementList, searchTerm, audienceFilter, statusFilter]);

  const totalAnnouncements = announcementList.length;

  const publishedAnnouncements = announcementList.filter(
    (item) => item.status === "Published"
  ).length;

  const draftAnnouncements = announcementList.filter(
    (item) => item.status === "Draft"
  ).length;

  const totalAudiences = Array.from(
    new Set(announcementList.map((item) => item.audience).filter(Boolean))
  ).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">
              Announcements Management
            </h1>
            <p className="mt-2 text-sm text-white/90">
              Create, publish, and manage announcements for students, parents,
              and staff.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Total Records: {announcementList.length}
            </div>

            {canManageAnnouncements && (
              <Link
                href="/dashboard/announcements/new"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
              >
                + New Announcement
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Announcements
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalAnnouncements}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Megaphone className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Published</p>
              <h3 className="mt-2 text-3xl font-bold text-green-700">
                {publishedAnnouncements}
              </h3>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Drafts</p>
              <h3 className="mt-2 text-3xl font-bold text-amber-600">
                {draftAnnouncements}
              </h3>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Audiences</p>
              <h3 className="mt-2 text-3xl font-bold text-blue-700">
                {totalAudiences}
              </h3>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Announcements Directory
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and manage all school announcements.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <input
              type="text"
              placeholder="Search by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 lg:w-72"
            />

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              {audienceOptions.map((audience) => (
                <option key={audience} value={audience}>
                  {audience === "All" ? "All Audiences" : audience}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Announcements
              </h2>
              <p className="text-sm text-slate-600">
                Showing {filteredAnnouncements.length} announcement
                {filteredAnnouncements.length === 1 ? "" : "s"}.
              </p>
            </div>

            <div className="text-sm text-slate-500">Aspire to Inspire</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Audience
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAnnouncements.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-slate-200 transition hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title || "Untitled Announcement"}
                      </p>
                      <p className="max-w-md truncate text-xs text-slate-500">
                        {item.content || "No content provided."}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.audience || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.date || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.author || "—"}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Draft"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/announcements/${item.id}`}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        View
                      </Link>

                      {canManageAnnouncements && (
                        <>
                          <Link
                            href={`/dashboard/announcements/${item.id}/edit`}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAnnouncement(item.id)
                            }
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAnnouncements.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No announcements match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}