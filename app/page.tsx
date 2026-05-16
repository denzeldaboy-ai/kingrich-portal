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

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/sign-in"
              className="rounded-2xl bg-[#0B3A6E] px-6 py-3 font-semibold text-white hover:bg-[#082c53]"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50"
            >
              Preview Dashboard
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
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-slate-200 bg-slate-100 text-slate-500 shadow-xl">
            Student image coming soon
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h3 className="text-2xl font-bold">Portal Features Coming Next</h3>
          <p className="mt-2 text-slate-600">
            We are building the system step by step for Kingrich Academy.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h4 className="font-semibold">Student Management</h4>
              <p className="mt-2 text-sm text-slate-600">
                Student profiles, class assignments, and guardian records.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h4 className="font-semibold">Attendance</h4>
              <p className="mt-2 text-sm text-slate-600">
                Daily class attendance and absence tracking.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h4 className="font-semibold">Fees</h4>
              <p className="mt-2 text-sm text-slate-600">
                Billing, payment records, and balances.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h4 className="font-semibold">Results & Reports</h4>
              <p className="mt-2 text-sm text-slate-600">
                Scores, report cards, and academic performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}