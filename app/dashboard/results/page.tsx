"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileBarChart2, Award, BookOpen, Users } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function ResultsPage() {
  const { currentRole, isLoaded } = useCurrentRole();

  const [resultList, setResultList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [termFilter, setTermFilter] = useState("All");

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase.from("results").select("*");

      if (error) {
        console.log("Error fetching results:", error.message);
      } else {
        setResultList(data || []);
      }
    };

    fetchResults();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading results...
      </div>
    );
  }

  const canManageResults = currentRole === "admin" || currentRole === "teacher";

  const handleDeleteResult = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("results").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setResultList((prev) => prev.filter((result) => result.id !== id));
  };

  const classOptions = useMemo(() => {
    const classes = Array.from(
      new Set(resultList.map((item) => item.className).filter(Boolean))
    );

    return ["All", ...classes];
  }, [resultList]);

  const termOptions = useMemo(() => {
    const terms = Array.from(
      new Set(resultList.map((item) => item.term).filter(Boolean))
    );

    return ["All", ...terms];
  }, [resultList]);

  const filteredResults = useMemo(() => {
    return resultList.filter((item) => {
      const matchesSearch =
        item.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All" || item.className === classFilter;

      const matchesTerm = termFilter === "All" || item.term === termFilter;

      return matchesSearch && matchesClass && matchesTerm;
    });
  }, [resultList, searchTerm, classFilter, termFilter]);

  const totalResults = resultList.length;

  const averageScore =
    resultList.length > 0
      ? Math.round(
          resultList.reduce((sum, item) => sum + Number(item.score || 0), 0) /
            resultList.length
        )
      : 0;

  const excellentResults = resultList.filter(
    (item) => Number(item.score || 0) >= 80
  ).length;

  const subjectsCount = Array.from(
    new Set(resultList.map((item) => item.subject).filter(Boolean))
  ).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">Results Management</h1>
            <p className="mt-2 text-sm text-white/90">
              Record student scores, grades, remarks, and term performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Total Records: {resultList.length}
            </div>

            {canManageResults && (
              <Link
                href="/dashboard/results/new"
                className="inline-flex items-center rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
              >
                + Add Result
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
                Total Results
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {totalResults}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <FileBarChart2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Average Score
              </p>
              <h3 className="mt-2 text-3xl font-bold text-blue-700">
                {averageScore}
              </h3>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Excellent</p>
              <h3 className="mt-2 text-3xl font-bold text-green-700">
                {excellentResults}
              </h3>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-700">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Subjects</p>
              <h3 className="mt-2 text-3xl font-bold text-amber-600">
                {subjectsCount}
              </h3>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Results Directory
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and manage student academic results.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <input
              type="text"
              placeholder="Search by student, ID, or subject..."
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
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              {termOptions.map((term) => (
                <option key={term} value={term}>
                  {term === "All" ? "All Terms" : term}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Results</h2>
              <p className="text-sm text-slate-600">
                Showing {filteredResults.length} result
                {filteredResults.length === 1 ? "" : "s"}.
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
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Student ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Term
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Grade
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-slate-200 transition hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.studentName || "Unnamed Student"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Kingrich Academy
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.studentId || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.className || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.subject || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.term || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-blue-700">
                    {item.score ?? 0}
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.grade || "—"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/results/${item.id}`}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        View
                      </Link>

                      {canManageResults && (
                        <>
                          <Link
                            href={`/dashboard/results/${item.id}/edit`}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteResult(item.id)}
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

              {filteredResults.length === 0 && (
                <tr>
                <td colSpan={8} className="px-6 py-14 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-500">
                      <FileBarChart2 className="h-7 w-7" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      No results found
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      No result records match your current search or filters. Try changing
                      your filters or add a new result.
                    </p>

                    {canManageResults && (
                      <Link
                        href="/dashboard/results/new"
                        className="mt-5 inline-flex items-center rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                      >
                        + Add Result
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