"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  sidebarByRole,
  roleAccess,
} from "@/app/lib/role-config";
import { useCurrentRole } from "@/app/lib/use-current-role";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, isLoaded, isSignedIn } = useCurrentRole();

  const navItems = sidebarByRole[currentRole];
  const allowedRoutes = roleAccess[currentRole];

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/");
      return;
    }

    const isAllowed = allowedRoutes.some((route) => {
      if (route === "/dashboard") {
        return pathname === "/dashboard";
      }

      return pathname === route || pathname.startsWith(`${route}/`);
    });

    if (!isAllowed) {
      router.push("/dashboard");
    }
  }, [pathname, allowedRoutes, router, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        Loading portal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-6">
          <div className="mb-8 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Kingrich Academy Logo"
              className="h-12 w-12 rounded-full bg-white object-contain p-1 ring-1 ring-slate-200"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Kingrich Academy
              </h2>
              <p className="text-sm text-slate-500">Portal</p>
            </div>
          </div>

          <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Signed in as: <span className="font-semibold capitalize">{currentRole}</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-900 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl bg-amber-50 p-4">
            <h3 className="text-base font-bold text-slate-900">School Level</h3>
            <p className="mt-1 text-sm text-slate-600">Crèche to JHS 3</p>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}

          <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
            <p>
              Kingrich Academy Portal • Aspire to Inspire
            </p>
            <p className="mt-1">
              School Management System v1.0
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}