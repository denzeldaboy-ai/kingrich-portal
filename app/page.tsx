"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <section className="bg-blue-900 text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kingrich Academy Logo"
              width={52}
              height={52}
              className="rounded-full bg-white object-contain p-1"
              priority
            />

            <div>
              <h1 className="text-lg font-bold text-white">
                Kingrich Academy Portal
              </h1>
              <p className="text-sm font-medium text-blue-100">
                Aspire to Inspire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#d4a017] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#c29313]"
            >
              Open Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            Creche to JHS 3
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Welcome to Kingrich Academy Portal
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Kingrich Academy is a leading school in Sasabi, near Dodowa, Accra,
            offering quality education from Creche to JHS 3. Guided by our motto{" "}
            <span className="font-semibold italic">“Aspire to Inspire,”</span>{" "}
            we are committed to raising confident, disciplined, and future-ready
            students.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Open Portal
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Location</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Mensa Bar, Sasabi, Near Dodowa, Accra, Ghana
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Contact</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                +233 593 345 496
                <br />
                info@kingrichfoundation.org
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src="/students.jpg"
              alt="Kingrich Academy Students"
              width={900}
              height={650}
              className="h-[360px] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-900">
              Portal Features
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Built for Daily School Management
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Kingrich Academy Portal helps manage key school operations from
              one secure dashboard: students, teachers, classes, attendance,
              results, fees, announcements, and role-based access.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Students</p>
              <p className="mt-2 text-sm text-slate-500">
                Add, view, edit, and manage student records.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Teachers</p>
              <p className="mt-2 text-sm text-slate-500">
                Keep teacher information organized and accessible.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Classes</p>
              <p className="mt-2 text-sm text-slate-500">
                Manage class levels, teachers, and status.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Attendance</p>
              <p className="mt-2 text-sm text-slate-500">
                Track daily attendance records clearly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Results</p>
              <p className="mt-2 text-sm text-slate-500">
                Record student scores, grades, terms, and remarks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Fees</p>
              <p className="mt-2 text-sm text-slate-500">
                Monitor amount due, amount paid, balances, and status.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Announcements</p>
              <p className="mt-2 text-sm text-slate-500">
                Share school updates with staff, students, or parents.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">Role Access</p>
              <p className="mt-2 text-sm text-slate-500">
                Give admins, teachers, and clerks the right access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Kingrich Academy Portal. All rights
            reserved.
          </p>

          <p className="font-medium text-slate-600">Aspire to Inspire</p>
        </div>
      </footer>
    </main>
  );
}