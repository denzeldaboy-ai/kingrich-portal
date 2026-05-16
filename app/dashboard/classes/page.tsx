"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Layers3, CheckCircle2, Users, XCircle } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function ClassesPage() {
  const { currentRole, isLoaded } = useCurrentRole();

  const [classList, setClassList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from("classes").select("*");

      if (error) {
        console.log("Error fetching classes:", error.message);
      } else {
        setClassList(data || []);
      }
    };

    fetchClasses();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading classes...
      </div>
    );
  }

  const canManageClasses = currentRole === "admin";

  const handleDeleteClass = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setClassList((prev) => prev.filter((classItem) => classItem.id !== id));
  };

  const levelOptions = useMemo(() => {
    const levels = Array.from(
      new Set(classList.map((item) => item.level).filter(Boolean))
    );

    return ["All", ...levels];
  }, [classList]);

  const filteredClasses = useMemo(() => {
    return classList.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classTeacher?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel = levelFilter === "All" || item.level === levelFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [classList, searchTerm, levelFilter, statusFilter]);

  const totalClasses = classList.length;

  const activeClasses = classList.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveClasses = classList.filter(
    (item) => item.status === "Inactive"
  ).length;

  const totalStudents = classList.reduce((sum, item) => {
    return sum + Number(item.studentsCount || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">Classes Management</h1>
            <p className="mt-2 text-sm text-white/90">
              Manage class records, track class teachers, and organize learning
              groups.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Total Records: {classList.length}
            </div>

            {canManageClasses && (
              <Link
                href="/dashboard/classes/new"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
              >
                + Add Class
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
                Total Classes
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalClasses}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Layers3 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Classes
              </p>
              <h3 className="mt-2 text-3xl font-bold text-green-700">
                {activeClasses}
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
              <p className="text-sm font-medium text-slate-500">
                Total Students
              </p>
              <h3 className="mt-2 text-3xl font-bold text-blue-700">
                {totalStudents}
              </h3>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Inactive Classes
              </p>
              <h3 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveClasses}
              </h3>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-700">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Classes Directory
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and manage all class records in one place.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <input
              type="text"
              placeholder="Search by class or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 lg:w-72"
            />

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level === "All" ? "All Levels" : level}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Full">Full</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Classes</h2>
              <p className="text-sm text-slate-600">
                Showing {filteredClasses.length} class
                {filteredClasses.length === 1 ? "" : "es"}.
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
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Class Teacher
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Students
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
              {filteredClasses.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-slate-200 transition hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name || "Unnamed Class"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Kingrich Academy
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.level || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.classTeacher || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.studentsCount ?? 0}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Full"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/classes/${item.id}`}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        View
                      </Link>

                      {canManageClasses && (
                        <>
                          <Link
                            href={`/dashboard/classes/${item.id}/edit`}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteClass(item.id)}
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

              {filteredClasses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No classes match your search or filters.
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