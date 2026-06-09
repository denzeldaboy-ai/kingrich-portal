export type UserRole = "admin" | "teacher" | "clerk";

export const roleAccess = {
  admin: [
    "/dashboard",
    "/dashboard/students",
    "/dashboard/teachers",
    "/dashboard/classes",
    "/dashboard/attendance",
    "/dashboard/results",
    "/dashboard/fees",
    "/dashboard/announcements",
    "/dashboard/roles",
    "/dashboard/settings",
    "/dashboard/users",
  ],
  teacher: [
    "/dashboard",
    "/dashboard/classes",
    "/dashboard/attendance",
    "/dashboard/results",
    "/dashboard/announcements",
  ],
  clerk: [
    "/dashboard",
    "/dashboard/students",
    "/dashboard/teachers",
    "/dashboard/fees",
    "/dashboard/announcements",
  ],
} as const;

export const sidebarByRole = {
  admin: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/students", label: "Students" },
    { href: "/dashboard/teachers", label: "Teachers" },
    { href: "/dashboard/classes", label: "Classes" },
    { href: "/dashboard/attendance", label: "Attendance" },
    { href: "/dashboard/results", label: "Results" },
    { href: "/dashboard/fees", label: "Fees" },
    { href: "/dashboard/announcements", label: "Announcements" },
    { href: "/dashboard/roles", label: "Roles" },
    { href: "/dashboard/users", label: "Users" },
    { href: "/dashboard/settings", label: "Settings" },
  ],
  teacher: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/classes", label: "Classes" },
    { href: "/dashboard/attendance", label: "Attendance" },
    { href: "/dashboard/results", label: "Results" },
    { href: "/dashboard/announcements", label: "Announcements" },
  ],
  clerk: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/students", label: "Students" },
    { href: "/dashboard/teachers", label: "Teachers" },
    { href: "/dashboard/fees", label: "Fees" },
    { href: "/dashboard/announcements", label: "Announcements" },
  ],
} as const;