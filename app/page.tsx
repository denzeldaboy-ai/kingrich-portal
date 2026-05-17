import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b bg-[#0B3A6E] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Kingrich Academy Logo"
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />
            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                Kingrich Academy Portal
              </h1>
              <p className="text-sm text-blue-100">Aspire to Inspire</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/sign-in"
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#D4A017] px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#e0ad22]"
            >
              Open Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            Crèche to JHS 3
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Kingrich Academy Portal
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Kingrich Academy is a leading school in Saasabi, near Dodowa,
            Accra, offering quality education from Crèche to JHS 3. Guided by
            our motto{" "}
            <span className="font-semibold italic">“Aspire to Inspire,”</span>{" "}
            we are committed to raising confident, disciplined, and future-ready
            students.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Open Portal
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Location</p>
              <p className="mt-1 text-sm text-slate-600">
                Mensa Bar, Saasabi, Near Dodowa, Accra, Ghana
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Contact</p>
              <p className="mt-1 text-sm text-slate-600">
                +233 593 345 496
                <br />
                info@kingrichfoundation.org
              </p>
            </div>
          </div>
        </div>

        <div>
          <img
            src="/school-hero.jpg"
            alt="Kingrich Academy students"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </section>

     <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Portal Features
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Built for Daily School Management
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Kingrich Academy Portal helps manage key school operations from one
            secure dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Students</h3>
            <p className="mt-2 text-sm text-slate-600">
              Register, view, edit, and manage student records.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Teachers</h3>
            <p className="mt-2 text-sm text-slate-600">
              Keep teacher profiles and staff information organized.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Classes</h3>
            <p className="mt-2 text-sm text-slate-600">
              Create classes and manage class-level information.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Attendance</h3>
            <p className="mt-2 text-sm text-slate-600">
              Record daily class attendance and monitor presence.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Results</h3>
            <p className="mt-2 text-sm text-slate-600">
              Save student scores, grades, terms, and remarks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Fees</h3>
            <p className="mt-2 text-sm text-slate-600">
              Track payments, balances, and fee status.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Announcements</h3>
            <p className="mt-2 text-sm text-slate-600">
              Publish notices for students, parents, teachers, and staff.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">Role Access</h3>
            <p className="mt-2 text-sm text-slate-600">
              Admin, teacher, and clerk dashboards with controlled access.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}