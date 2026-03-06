import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { courses, deadlines, type Deadline } from "@/data/mockData";
import { cn } from "@/lib/utils";

const categoryOptions = [
  { id: "problem-sets", label: "Problem Sets" },
  { id: "write-ups", label: "Write-ups" },
  { id: "projects", label: "Projects" },
  { id: "exams", label: "Exams" },
  { id: "office-hours", label: "Office Hours" },
];

const calendarTypes = [
  { id: "google", label: "Google Calendar", ext: "ics" },
  { id: "apple", label: "Apple Calendar", ext: "ics" },
  { id: "outlook", label: "Outlook", ext: "ics" },
];

// Office hours data for ICS generation
const officeHoursSchedule = [
  { courseId: "pm", day: "TU", start: "13:00", end: "14:00", label: "15.785 Office Hours" },
  { courseId: "analytics", day: "MO", start: "13:00", end: "14:00", label: "15.089 Office Hours" },
  { courseId: "analytics", day: "WE", start: "13:00", end: "14:00", label: "15.089 Office Hours" },
  { courseId: "analytics", day: "FR", start: "13:00", end: "14:00", label: "15.089 Office Hours" },
  { courseId: "timeseries", day: "FR", start: "14:00", end: "17:00", label: "6.S899 Office Hours" },
  { courseId: "strategy", day: "WE", start: "14:00", end: "15:00", label: "15.900 Office Hours" },
  { courseId: "strategy", day: "TH", start: "16:00", end: "18:00", label: "15.900 Office Hours" },
];

function matchesCategoryExport(title: string, type: string, category: string): boolean {
  const t = title.toLowerCase();
  switch (category) {
    case "problem-sets":
      return t.includes("problem set");
    case "write-ups":
      return t.includes("write-up") || t.includes("writeup") || t.includes("journey map") || t.includes("aok") || t.includes("competitive analysis") || t.includes("memo");
    case "projects":
      return type === "project" || type === "presentation" || t.includes("project") || t.includes("checkpoint") || t.includes("presentation");
    case "exams":
      return type === "exam" || t.includes("midterm") || t.includes("final exam");
    default:
      return false;
  }
}

function formatICSDate(dateStr: string): string {
  return dateStr.replace(/-/g, "") + "T235900Z";
}

function generateICS(
  selectedCourses: string[],
  selectedCategories: string[],
  calendarType: string
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MIT Sloan Syllabus Tool//EN",
    `X-WR-CALNAME:MIT Sloan Deadlines`,
  ];

  // Add deadline events
  const filteredDeadlines = deadlines.filter((d) => {
    if (!selectedCourses.includes(d.courseId)) return false;
    return selectedCategories.some((cat) =>
      cat === "office-hours" ? false : matchesCategoryExport(d.title, d.type, cat)
    );
  });

  filteredDeadlines.forEach((d) => {
    const course = courses.find((c) => c.id === d.courseId);
    lines.push("BEGIN:VEVENT");
    lines.push(`DTSTART:${formatICSDate(d.dueDate)}`);
    lines.push(`SUMMARY:${d.title}`);
    lines.push(`DESCRIPTION:${course?.number} - ${course?.name}${d.weight ? ` (${d.weight}%)` : ""}`);
    lines.push(`UID:${d.id}@mitsloan-syllabus`);
    lines.push("END:VEVENT");
  });

  // Add office hours as recurring events
  if (selectedCategories.includes("office-hours")) {
    officeHoursSchedule
      .filter((oh) => selectedCourses.includes(oh.courseId))
      .forEach((oh, i) => {
        lines.push("BEGIN:VEVENT");
        lines.push(`DTSTART:20260302T${oh.start.replace(":", "")}00`);
        lines.push(`DTEND:20260302T${oh.end.replace(":", "")}00`);
        lines.push(`RRULE:FREQ=WEEKLY;BYDAY=${oh.day};UNTIL=20260501T000000Z`);
        lines.push(`SUMMARY:${oh.label}`);
        lines.push(`UID:oh-${oh.courseId}-${i}@mitsloan-syllabus`);
        lines.push("END:VEVENT");
      });
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function CalendarExportDialog() {
  const [open, setOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(courses.map((c) => c.id));
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryOptions.map((c) => c.id)
  );
  const [calendarType, setCalendarType] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const toggleCourse = (id: string) =>
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const handleExport = () => {
    const ics = generateICS(selectedCourses, selectedCategories, calendarType);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mit-sloan-deadlines.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setStep(1); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full text-xs">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">
            {step === 1 ? "What to export?" : "Choose calendar"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Courses</p>
              {courses.map((c) => (
                <label key={c.id} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedCourses.includes(c.id)}
                    onCheckedChange={() => toggleCourse(c.id)}
                  />
                  <span className="text-sm text-foreground">{c.number} — {c.name}</span>
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</p>
              {categoryOptions.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() => toggleCategory(cat.id)}
                  />
                  <span className="text-sm text-foreground">{cat.label}</span>
                </label>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full rounded-full"
              disabled={selectedCourses.length === 0 || selectedCategories.length === 0}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {calendarTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setCalendarType(ct.id)}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  calendarType === ct.id
                    ? "border-primary bg-primary/5 text-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {ct.label}
              </button>
            ))}

            <Button
              onClick={handleExport}
              className="w-full rounded-full"
              disabled={!calendarType}
            >
              Download .ics File
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
