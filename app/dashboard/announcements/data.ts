export type Announcement = {
  id: string;
  title: string;
  audience: string;
  date: string;
  status: "Published" | "Draft";
  author: string;
  content: string;
};

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "End of Term Examination Notice",
    audience: "All Students",
    date: "2026-04-15",
    status: "Published",
    author: "Admin Office",
    content:
      "End of term examinations will begin on Monday, 20th April. Students are expected to be punctual and fully prepared.",
  },
  {
    id: "2",
    title: "PTA Meeting Reminder",
    audience: "Parents & Guardians",
    date: "2026-04-18",
    status: "Published",
    author: "Head Teacher",
    content:
      "A PTA meeting will be held on Friday at 10:00 AM in the school assembly hall. All parents are encouraged to attend.",
  },
  {
    id: "3",
    title: "Staff Briefing",
    audience: "Teachers",
    date: "2026-04-19",
    status: "Draft",
    author: "Administrator",
    content:
      "There will be a staff briefing to review exam supervision duties and reporting expectations for the term.",
  },
];
