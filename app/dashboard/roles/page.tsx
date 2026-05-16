"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  GraduationCap,
  ClipboardList,
  Users,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function RolesPage() {
  const { currentRole, isLoaded } = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (currentRole !== "admin") {
      router.push("/dashboard");
    }
  }, [currentRole, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading roles...
      </div>
    );
  }

  if (currentRole !== "admin") {
    return null;
  }

  const roles = [
    {
      name: "Admin",
      key: "admin",
      description:
        "Full access to manage the entire school system, including records, payments, announcements, and role settings.",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
      badge: "Full Access",
      permissions: [
        { label: "Dashboard", allowed: true },
        { label: "Students", allowed: true },
        { label: "Teachers", allowed: true },
        { label: "Classes", allowed: true },
        { label: "Attendance", allowed: true },
        { label: "Results", allowed: true },
        { label: "Fees", allowed: true },
        { label: "Announcements", allowed: true },
        { label: "Roles", allowed: true },
      ],
    },
    {
      name: "Teacher",
      key: "teacher",
      description:
        "Teaching staff access for managing class work, attendance, results, and viewing school notices.",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-green-100 text-green-700",
      badge: "Academic Access",
      permissions: [
        { label: "Dashboard", allowed: true },
        { label: "Students", allowed: false },
        { label: "Teachers", allowed: false },
        { label: "Classes", allowed: true },
        { label: "Attendance", allowed: true },
        { label: "Results", allowed: true },
        { label: "Fees", allowed: false },
        { label: "Announcements", allowed: true },
        { label: "Roles", allowed: false },
      ],
    },
    {
      name: "Clerk",
      key: "clerk",
      description:
        "Office staff access for viewing records, managing payments, and supporting administrative workflows.",
      icon: <ClipboardList className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-700",
      badge: "Office Access",
      permissions: [
        { label: "Dashboard", allowed: true },
        { label: "Students", allowed: true },
        { label: "Teachers", allowed: true },
        { label: "Classes", allowed: false },
        { label: "Attendance", allowed: false },
        { label: "Results", allowed: false },
        { label: "Fees", allowed: true },
        { label: "Announcements", allowed: true },
        { label: "Roles", allowed: false },
      ],
    },
  ];

  const totalRoles = roles.length;
  const protectedRoles = roles.filter((role) => role.key !== "admin").length;
  const totalPermissionItems = roles.reduce(
    (sum, role) => sum + role.permissions.length,
    0
  );
  const allowedPermissionItems = roles.reduce(
    (sum, role) =>
      sum + role.permissions.filter((permission) => permission.allowed).length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">Roles Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              Review system roles, permissions, and access levels for admins,
              teachers, and clerks.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <Lock className="h-4 w-4" />
            Admin Only
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Roles"
          value={totalRoles}
          icon={<Users className="h-5 w-5" />}
          iconWrap="bg-slate-100 text-slate-700"
        />

        <SummaryCard
          title="Protected Roles"
          value={protectedRoles}
          icon={<Lock className="h-5 w-5" />}
          iconWrap="bg-red-100 text-red-700"
        />

        <SummaryCard
          title="Permission Items"
          value={totalPermissionItems}
          icon={<ClipboardList className="h-5 w-5" />}
          iconWrap="bg-blue-100 text-blue-700"
        />

        <SummaryCard
          title="Allowed Access"
          value={allowedPermissionItems}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconWrap="bg-green-100 text-green-700"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.key}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className={`rounded-xl p-3 ${role.color}`}>
                {role.icon}
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {role.badge}
              </span>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              {role.name}
            </h2>

            <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">
              {role.description}
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">
                Access Permissions
              </h3>

              <div className="mt-4 space-y-3">
                {role.permissions.map((permission) => (
                  <div
                    key={permission.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-slate-700">
                      {permission.label}
                    </span>

                    {permission.allowed ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                        <XCircle className="h-3.5 w-3.5" />
                        Blocked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Role Security Note
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This page displays role permissions inside the app. Your actual
              account role is still controlled by Clerk metadata. Keep this page
              admin-only so teachers and clerks cannot view or modify role
              settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconWrap,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconWrap: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>

        <div className={`rounded-xl p-3 ${iconWrap}`}>{icon}</div>
      </div>
    </div>
  );
}