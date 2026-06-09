"use client";

import { useEffect, useState } from "react";
import { MailPlus, ShieldCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/app/lib/use-current-role";

type UserRole = "admin" | "teacher" | "clerk";

export default function UsersPage() {
  const router = useRouter();
  const { currentRole, isLoaded } = useCurrentRole();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("teacher");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    if (currentRole !== "admin") {
      router.push("/dashboard");
    }
  }, [currentRole, isLoaded, router]);

  async function handleInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send invitation.");
        return;
      }

      setMessage("Invitation sent successfully.");
      setFullName("");
      setEmail("");
      setRole("teacher");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while sending the invitation.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  if (currentRole !== "admin") {
    return null;
  }

  return (
    <main className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 p-8 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
              Admin Center
            </p>
            <h1 className="mt-3 text-3xl font-bold">User Accounts</h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Invite admins, teachers, and clerks to access the Kingrich Academy
              Portal with the correct role permissions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <ShieldCheck className="h-8 w-8 text-blue-100" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <UserPlus className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Invite New User
              </h2>
              <p className="text-sm text-slate-500">
                The invited user will receive an email and their role will be
                saved automatically.
              </p>
            </div>
          </div>

          {message && (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleInvite} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Example: Ama Mensah"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="example@email.com"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Role
              </label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="teacher">Teacher</option>
                <option value="clerk">Clerk</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MailPlus className="h-4 w-4" />
              {loading ? "Sending Invitation..." : "Send Invitation"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Role Permissions
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            These roles control what each staff member can manage in the portal.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Admin</p>
              <p className="mt-1 text-sm text-slate-500">
                Full access to students, teachers, classes, fees, results,
                attendance, announcements, roles, and users.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Teacher</p>
              <p className="mt-1 text-sm text-slate-500">
                Can manage academic work like classes, attendance, results, and
                announcements where allowed.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Clerk</p>
              <p className="mt-1 text-sm text-slate-500">
                Can manage office records like students, fees, and related
                administrative information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}