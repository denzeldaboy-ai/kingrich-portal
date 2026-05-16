"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabase";

export default function EditAnnouncementPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [announcement, setAnnouncement] = useState<any | null>(null);
  const [isFetchingAnnouncement, setIsFetchingAnnouncement] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    audience: "",
    date: "",
    author: "",
    status: "",
    content: "",
  });

  useEffect(() => {
    async function fetchAnnouncement() {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Announcement fetch error:", error.message);
        setAnnouncement(null);
      } else {
        setAnnouncement(data);
      }

      setIsFetchingAnnouncement(false);
    }

    fetchAnnouncement();
  }, [id]);

  useEffect(() => {
    if (!announcement) return;

    setFormData({
      title: announcement.title ?? "",
      audience: announcement.audience ?? "",
      date: announcement.date ?? "",
      author: announcement.author ?? "",
      status: announcement.status ?? "Published",
      content: announcement.content ?? "",
    });
  }, [announcement]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!announcement) return;

    const { error } = await supabase
      .from("announcements")
      .update({
        title: formData.title,
        audience: formData.audience,
        date: formData.date,
        author: formData.author,
        status: formData.status,
        content: formData.content,
      })
      .eq("id", announcement.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Announcement changes saved successfully.");
    router.push(`/dashboard/announcements/${id}`);
  };

  if (isFetchingAnnouncement) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-600">
        Loading announcement...
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="text-sm text-red-600">Announcement not found.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200">
              Edit Announcement
            </p>
            <h1 className="mt-1 text-3xl font-bold">Edit Announcement</h1>
            <p className="mt-2 text-sm text-white/90">
              Update announcement title, audience, date, status, and content.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/dashboard/announcements/${announcement.id}`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
            >
              Back to Announcement
            </Link>

            <Link
              href="/dashboard/announcements"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Back to Announcements
            </Link>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title ?? ""}
              onChange={handleChange}
              placeholder="Enter announcement title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Audience
            </label>
            <select
              name="audience"
              value={formData.audience ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Select audience</option>
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Parents">Parents</option>
              <option value="Teachers">Teachers</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author ?? ""}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status ?? ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content ?? ""}
              onChange={handleChange}
              placeholder="Write the announcement content here..."
              rows={6}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="submit"
            style={{
              backgroundColor: "#1e40af",
              color: "white",
              border: "none",
              opacity: 1,
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:brightness-90"
          >
            <Save className="h-4 w-4" style={{ color: "white" }} />
            Save Changes
          </button>

          <Link
            href={`/dashboard/announcements/${announcement.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}