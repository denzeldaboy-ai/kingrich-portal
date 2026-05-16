"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Users,
  GraduationCap,
  Layers3,
  CalendarCheck2,
  FileBarChart2,
  Wallet,
  Megaphone,
} from "lucide-react";
import { roles } from "./roles/data";
import { supabase } from "@/app/lib/supabase";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function DashboardPage() {
  const { currentRole, isLoaded } = useCurrentRole();

  const [studentList, setStudentList] = useState<any[]>([]);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [resultList, setResultList] = useState<any[]>([]);
  const [feeList, setFeeList] = useState<any[]>([]);
  const [announcementList, setAnnouncementList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      const [
        studentsResult,
        teachersResult,
        classesResult,
        attendanceResult,
        resultsResult,
        feesResult,
        announcementsResult,
      ] = await Promise.all([
        supabase.from("students").select("*"),
        supabase.from("teachers").select("*"),
        supabase.from("classes").select("*"),
        supabase.from("attendance").select("*"),
        supabase.from("results").select("*"),
        supabase.from("fees").select("*"),
        supabase.from("announcements").select("*"),
      ]);

      if (studentsResult.error) {
        console.log("Students error:", studentsResult.error.message);
      } else {
        setStudentList(studentsResult.data || []);
      }

      if (teachersResult.error) {
        console.log("Teachers error:", teachersResult.error.message);
      } else {
        setTeacherList(teachersResult.data || []);
      }

      if (classesResult.error) {
        console.log("Classes error:", classesResult.error.message);
      } else {
        setClassList(classesResult.data || []);
      }

      if (attendanceResult.error) {
        console.log("Attendance error:", attendanceResult.error.message);
      } else {
        setAttendanceList(attendanceResult.data || []);
      }

      if (resultsResult.error) {
        console.log("Results error:", resultsResult.error.message);
      } else {
        setResultList(resultsResult.data || []);
      }

      if (feesResult.error) {
        console.log("Fees error:", feesResult.error.message);
      } else {
        setFeeList(feesResult.data || []);
      }

      if (announcementsResult.error) {
        console.log("Announcements error:", announcementsResult.error.message);
      } else {
        setAnnouncementList(announcementsResult.data || []);
      }
    }

    fetchDashboardData();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  const safeRole =
    currentRole === "admin" || currentRole === "teacher" || currentRole === "clerk"
      ? currentRole
      : "clerk";

  const totalStudents = studentList.length;
  const totalTeachers = teacherList.length;
  const totalClasses = classList.length;

  const totalAttendancePresent = attendanceList.reduce((sum, item) => {
    return sum + Number(item.present || 0);
  }, 0);

  const totalCollected = useMemo(() => {
    return feeList.reduce((sum, item) => sum + Number(item.amountPaid || 0), 0);
  }, [feeList]);

  const recentAnnouncements = announcementList.slice(0, 3);

  const adminStats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: <Users className="h-5 w-5" />,
      iconWrap: "bg-slate-100 text-slate-700",
    },
    {
      title: "Total Teachers",
      value: totalTeachers,
      icon: <GraduationCap className="h-5 w-5" />,
      iconWrap: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Classes",
      value: totalClasses,
      icon: <Layers3 className="h-5 w-5" />,
      iconWrap: "bg-amber-100 text-amber-700",
    },
    {
      title: "Attendance Today",
      value: totalAttendancePresent,
      icon: <CalendarCheck2 className="h-5 w-5" />,
      iconWrap: "bg-green-100 text-green-700",
    },
  ];

  const teacherStats = [
    {
      title: "Assigned Classes",
      value: totalClasses,
      icon: <Layers3 className="h-5 w-5" />,
      iconWrap: "bg-amber-100 text-amber-700",
    },
    {
      title: "Attendance Records",
      value: attendanceList.length,
      icon: <CalendarCheck2 className="h-5 w-5" />,
      iconWrap: "bg-green-100 text-green-700",
    },
    {
      title: "Results Records",
      value: resultList.length,
      icon: <FileBarChart2 className="h-5 w-5" />,
      iconWrap: "bg-blue-100 text-blue-700",
    },
    {
      title: "Announcements",
      value: announcementList.length,
      icon: <Megaphone className="h-5 w-5" />,
      iconWrap: "bg-slate-100 text-slate-700",
    },
  ];

  const clerkStats = [
    {
      title: "Student Records",
      value: totalStudents,
      icon: <Users className="h-5 w-5" />,
      iconWrap: "bg-slate-100 text-slate-700",
    },
    {
      title: "Teacher Records",
      value: totalTeachers,
      icon: <GraduationCap className="h-5 w-5" />,
      iconWrap: "bg-blue-100 text-blue-700",
    },
    {
      title: "Fee Records",
      value: feeList.length,
      icon: <Wallet className="h-5 w-5" />,
      iconWrap: "bg-green-100 text-green-700",
    },
    {
      title: "Fees Collected",
      value: totalCollected.toLocaleString(),
      icon: <Wallet className="h-5 w-5" />,
      iconWrap: "bg-amber-100 text-amber-700",
    },
  ];

  const statsByRole = {
    admin: adminStats,
    teacher: teacherStats,
    clerk: clerkStats,
  };

  const adminActions = [
    {
      href: "/dashboard/students/new",
      title: "Add Student",
      text: "Register a new student into the portal.",
      icon: <Users className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/teachers/new",
      title: "Add Teacher",
      text: "Create a new teacher profile and record.",
      icon: <GraduationCap className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/classes/new",
      title: "Add Class",
      text: "Set up a new class and teacher assignment.",
      icon: <Layers3 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/attendance/new",
      title: "Mark Attendance",
      text: "Record daily student attendance by class.",
      icon: <CalendarCheck2 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/results/new",
      title: "Add Result",
      text: "Enter academic performance and grades.",
      icon: <FileBarChart2 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/fees/new",
      title: "Record Payment",
      text: "Capture fee payment and update balances.",
      icon: <Wallet className="h-5 w-5 text-blue-700" />,
    },
  ];

  const teacherActions = [
    {
      href: "/dashboard/attendance/new",
      title: "Mark Attendance",
      text: "Record attendance for your assigned class.",
      icon: <CalendarCheck2 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/results/new",
      title: "Add Result",
      text: "Enter student scores and remarks.",
      icon: <FileBarChart2 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/classes",
      title: "View Classes",
      text: "Review classes and class information.",
      icon: <Layers3 className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/announcements",
      title: "View Notices",
      text: "Read school-wide announcements.",
      icon: <Megaphone className="h-5 w-5 text-blue-700" />,
    },
  ];

  const clerkActions = [
    {
      href: "/dashboard/students",
      title: "View Students",
      text: "Review student records.",
      icon: <Users className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/teachers",
      title: "View Teachers",
      text: "Review teacher records.",
      icon: <GraduationCap className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/fees/new",
      title: "Record Payment",
      text: "Capture fee payments and balances.",
      icon: <Wallet className="h-5 w-5 text-blue-700" />,
    },
    {
      href: "/dashboard/announcements",
      title: "View Announcements",
      text: "Read important school notices.",
      icon: <Megaphone className="h-5 w-5 text-blue-700" />,
    },
  ];

  const actionsByRole = {
    admin: adminActions,
    teacher: teacherActions,
    clerk: clerkActions,
  };

  const summaryByRole = {
    admin: [
      { label: "Results Records", value: resultList.length },
      { label: "Fee Records", value: feeList.length },
      { label: "Roles", value: roles.length },
      { label: "Announcements", value: announcementList.length },
      { label: "Fees Collected", value: totalCollected.toLocaleString() },
    ],
    teacher: [
      { label: "Attendance Records", value: attendanceList.length },
      { label: "Results Records", value: resultList.length },
      { label: "Classes", value: classList.length },
      { label: "Announcements", value: announcementList.length },
      { label: "Teachers", value: totalTeachers },
    ],
    clerk: [
      { label: "Student Records", value: totalStudents },
      { label: "Teacher Records", value: totalTeachers },
      { label: "Fee Records", value: feeList.length },
      { label: "Announcements", value: announcementList.length },
      { label: "Fees Collected", value: totalCollected.toLocaleString() },
    ],
  };

  const welcomeTitle =
    safeRole === "admin"
      ? "Welcome to the Admin Dashboard"
      : safeRole === "teacher"
      ? "Welcome to the Teacher Dashboard"
      : "Welcome to the Clerk Dashboard";

  const welcomeText =
    safeRole === "admin"
      ? "Manage students, teachers, classes, attendance, results, fees, announcements, and school operations from one central place."
      : safeRole === "teacher"
      ? "Manage class activities, attendance, results, and important school notices from one teaching dashboard."
      : "Manage student records, teacher records, payments, and notices from one office dashboard.";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">{welcomeTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              {welcomeText}
            </p>
          </div>

          <div className="inline-flex rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            Aspire to Inspire
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsByRole[safeRole].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h3>
              </div>
              <div className={`rounded-xl p-3 ${item.iconWrap}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Jump directly into key school management tasks.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {actionsByRole[safeRole].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                {item.icon}
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Recent Notices
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title || "Untitled Announcement"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.audience || "Audience"} •{" "}
                      {item.status || "Status"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  No recent announcements yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Portal Summary
            </h2>

            <div className="mt-5 space-y-4">
              {summaryByRole[safeRole].map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between ${
                    index !== summaryByRole[safeRole].length - 1
                      ? "border-b border-slate-100 pb-3"
                      : ""
                  }`}
                >
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}