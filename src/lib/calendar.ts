// Helper untuk generate link Add to Calendar (Google) & file .ics (Apple/Outlook)

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  /** ISO local datetime string e.g. "2026-05-11T09:00:00" */
  start: string;
  /** Duration in hours */
  durationHours: number;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Format Date → "YYYYMMDDTHHmmss" (waktu lokal, tanpa Z) */
const formatLocal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
    d.getHours()
  )}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

const addHours = (d: Date, h: number) => new Date(d.getTime() + h * 3600 * 1000);

export const buildGoogleCalendarUrl = (e: CalendarEvent) => {
  const start = new Date(e.start);
  const end = addHours(start, e.durationHours);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    details: e.description,
    location: e.location,
    dates: `${formatLocal(start)}/${formatLocal(end)}`,
    ctz: "Asia/Jakarta",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const buildIcsContent = (e: CalendarEvent) => {
  const start = new Date(e.start);
  const end = addHours(start, e.durationHours);
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@aldi-ecaa-wedding`;
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aldi & Ecaa Wedding//ID",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatLocal(new Date())}`,
    `DTSTART;TZID=Asia/Jakarta:${formatLocal(start)}`,
    `DTEND;TZID=Asia/Jakarta:${formatLocal(end)}`,
    `SUMMARY:${escape(e.title)}`,
    `DESCRIPTION:${escape(e.description)}`,
    `LOCATION:${escape(e.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

export const downloadIcs = (e: CalendarEvent, filename: string) => {
  const blob = new Blob([buildIcsContent(e)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
