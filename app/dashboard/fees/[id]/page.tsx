"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  PencilLine,
  WalletCards,
  User,
  BadgeInfo,
  Layers3,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

export default function FeeProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [fee, setFee] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFee() {
      const { data, error } = await supabase
        .from("fees")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Fee profile fetch error:", error.message);
        setFee(null);
      } else {
        setFee(data);
      }

      setIsLoading(false);
    }

    fetchFee();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading payment record...
      </div>
    );
  }

  if (!fee) {
    return <div className="text-sm text-red-600">Payment record not found.</div>;
  }

  const amountDue = Number(fee.amountDue || 0);
  const amountPaid = Number(fee.amountPaid || 0);
  const balance = Number(fee.balance || 0);

  const paymentRate =
    amountDue > 0 ? Math.round((amountPaid / amountDue) * 100) : 0;

  const infoCards = [
    {
      label: "Student",
      value: fee.studentName ?? "Not provided",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Class",
      value: fee.className ?? "Not provided",
      icon: <Layers3 className="h-5 w-5" />,
    },
    {
      label: "Amount Paid",
      value: amountPaid,
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      label: "Balance",
      value: balance,
      icon: <AlertCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Kingrich Academy Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold">Payment Record</h1>
            <p className="mt-2 text-sm text-white/90">
              View student fee payment, balance, term, and payment status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/fees"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Fees
            </Link>

            <Link
              href={`/dashboard/fees/${fee.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-yellow-300"
            >
              <PencilLine className="h-4 w-4" />
              Edit Payment
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {infoCards.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <WalletCards className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Payment Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Student Name" value={fee.studentName} />
            <InfoRow label="Student ID" value={fee.studentId} />
            <InfoRow label="Class" value={fee.className} />
            <InfoRow label="Term" value={fee.term} />
            <InfoRow label="Amount Due" value={fee.amountDue} />
            <InfoRow label="Amount Paid" value={fee.amountPaid} />
            <InfoRow label="Balance" value={fee.balance} />
            <InfoRow label="Status" value={fee.status} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <BadgeInfo className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">
                Payment Status
              </h2>
            </div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                fee.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : fee.status === "Partial"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {fee.status || "Unknown"}
            </span>

            <p className="mt-4 text-sm text-slate-600">
              Payment completion is{" "}
              <span className="font-semibold text-slate-900">
                {paymentRate}%
              </span>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Summary</h2>
            </div>

            <div className="space-y-4">
              <InfoRow label="Amount Due" value={amountDue} />
              <InfoRow label="Amount Paid" value={amountPaid} />
              <InfoRow label="Balance" value={balance} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">Term</h2>
            </div>

            <InfoRow label="Academic Term" value={fee.term} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">
        {value === 0 ? 0 : value || "Not provided"}
      </p>
    </div>
  );
}