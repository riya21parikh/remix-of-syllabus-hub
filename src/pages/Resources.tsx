import { motion } from "framer-motion";
import { ExternalLink, CalendarDays, Briefcase, Heart, BookOpen } from "lucide-react";
import { MitSloanLogo } from "@/components/MitSloanLogo";

const links = [
  {
    title: "Academic Calendar",
    description: "MIT Registrar's official academic calendar with key dates and deadlines.",
    url: "https://registrar.mit.edu/calendar",
    icon: CalendarDays,
  },
  {
    title: "Career Development Office",
    description: "Career resources, job postings, and professional development.",
    url: "https://cdo.mit.edu/channels/",
    icon: Briefcase,
  },
  {
    title: "Mental Health & Counseling",
    description: "Student mental health services and counseling support.",
    url: "https://health.mit.edu/services/mental-health-counseling",
    icon: Heart,
  },
  {
    title: "Academic Support Resources",
    description: "Tutoring, study groups, and academic support programs.",
    url: "https://advising.mit.edu/fli/resources/academic-support-resources/",
    icon: BookOpen,
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-md px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <MitSloanLogo className="h-6" />
          <h1 className="text-lg font-bold text-foreground">Resources</h1>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-5 space-y-3">
        {links.map((link, i) => (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-4 rounded-xl border bg-card px-4 py-4 hover:bg-secondary/50 transition-colors group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <link.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{link.title}</p>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {link.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
