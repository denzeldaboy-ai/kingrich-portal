"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarCheck2, CheckCircle2, UserX, Users } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function AttendancePage() {
  const { currentRole, isLoaded } = useCurrentRole();

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase.from("attendance").select("*");

      if (error) {
        console.log("Error fetching attendance:", error.message);
      } else {
        setAttendanceList(data || []);
      }
    };

    fetchAttendance();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading attendance...
      </div>
    );
  }

  const canManageAttendance = currentRole === "admin" || currentRole === "teacher";

  const handleDeleteAttendance = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("attendance").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setAttendanceList((prev) => prev.filter((record) => record.id !== id));
  };

  const classOptions = useMemo(() => {
    const classes = Array.from(
      new Set(attendanceList.map((item) => item.className).filter(Boolean))
    );

    return ["All", ...classes];
  }, [attendanceList]);

  const filteredAttendance = useMemo(() => {
    return attendanceList.filter((item) => {
      const matchesSearch =
        item.className?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classTeacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All" || item.className === classFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [attendanceList, searchTerm, classFilter, statusFilter]);

  const totalRecords = attendanceList.length;

  const totalStudents = attendanceList.reduce((sum, item) => {
    return sum + Number(item.totalStudents || 0);
  }, 0);

  const totalPresent = attendanceList.reduce((sum, item) => {
    return sum + Number(item.present || 0);
  }, 0);

  const totalAbsent = attendanceList.reduce((sum, item) => {
    return sum + Number(item.absent || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">Attendance Management</h1>
            <p className="mt-2 text-sm text-white/90">
              Record daily class attendance and monitor student presence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Total Records: {attendanceList.length}
            </div>

            {canManageAttendance && (
              <Link
                href="/dashboard/attendance/new"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
              >
                + Mark Attendance
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
                Total Records
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalRecords}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <CalendarCheck2 className="h-5 w-5" />
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
              <p className="text-sm font-medium text-slate-500">Present</p>
              <h3 className="mt-2 text-3xl font-bold text-green-700">
                {totalPresent}
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
              <p className="text-sm font-medium text-slate-500">Absent</p>
              <h3 className="mt-2 text-3xl font-bold text-red-600">
                {totalAbsent}
              </h3>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-700">
              <UserX className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Attendance Directory
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and manage all attendance records in one place.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <input
              type="text"
              placeholder="Search by class, teacher, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 lg:w-72"
            />

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              {classOptions.map((className) => (
                <option key={className} value={className}>
                  {className === "All" ? "All Classes" : className}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Attendance Records
              </h2>
              <p className="text-sm text-slate-600">
                Showing {filteredAttendance.length} record
                {filteredAttendance.length === 1 ? "" : "s"}.
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
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Class Teacher
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Present
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Absent
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
              {filteredAttendance.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-slate-200 transition hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    {item.date || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.className || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.classTeacher || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.totalStudents ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-green-700">
                    {item.present ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-red-600">
                    {item.absent ?? 0}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
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
                        href={`/dashboard/attendance/${item.id}`}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        View
                      </Link>

                      {canManageAttendance && (
                        <>
                          <Link
                            href={`/dashboard/attendance/${item.id}/edit`}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteAttendance(item.id)}
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

              {filteredAttendance.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-14 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-500">
                        <CalendarCheck2 className="h-7 w-7" />
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        No attendance records found
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        No attendance records match your current search or filters. Try
                        changing your filters or mark attendance for a class.
                      </p>

                      {canManageAttendance && (
                        <Link
                          href="/dashboard/attendance/new"
                          className="mt-5 inline-flex items-center rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                          + Mark Attendance
                        </Link>
                      )}
                    </div>
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