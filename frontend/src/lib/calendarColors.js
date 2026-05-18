export const CALENDAR_COLORS = [
  {
    key: "indigo",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    border: "border-indigo-400",
    softBg: "bg-indigo-50",
  },
  {
    key: "sky",
    bg: "bg-sky-100",
    text: "text-sky-700",
    dot: "bg-sky-500",
    border: "border-sky-400",
    softBg: "bg-sky-50",
  },
  {
    key: "emerald",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-400",
    softBg: "bg-emerald-50",
  },
  {
    key: "amber",
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
    border: "border-amber-400",
    softBg: "bg-amber-50",
  },
  {
    key: "rose",
    bg: "bg-rose-100",
    text: "text-rose-700",
    dot: "bg-rose-500",
    border: "border-rose-400",
    softBg: "bg-rose-50",
  },
  {
    key: "violet",
    bg: "bg-violet-100",
    text: "text-violet-700",
    dot: "bg-violet-500",
    border: "border-violet-400",
    softBg: "bg-violet-50",
  },
];

export const NEUTRAL_CALENDAR_COLOR = {
  key: "neutral",
  bg: "bg-slate-100",
  text: "text-slate-700",
  dot: "bg-slate-500",
  border: "border-slate-300",
  softBg: "bg-slate-50",
};

function hashCourseCode(courseCode) {
  return [...courseCode.toUpperCase()].reduce(
    (hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0,
    0
  );
}

export function getCalendarColor(courseCode) {
  if (!courseCode || typeof courseCode !== "string") {
    return NEUTRAL_CALENDAR_COLOR;
  }

  const index = Math.abs(hashCourseCode(courseCode)) % CALENDAR_COLORS.length;
  return CALENDAR_COLORS[index];
}
