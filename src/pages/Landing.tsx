import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SyllabLogo } from "@/components/SyllabLogo";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>

        <div className="flex items-center justify-center gap-3">
          <SyllabLogo className="h-6 text-2xl" />
        </div>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Upload your syllabus, and this tool does the rest. All your deadlines,
          grades, and course info — organized in one place.
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/signin")}
          className="mt-10 w-full max-w-xs rounded-full text-base font-medium gap-2"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="mt-6 text-xs text-muted-foreground">
          Demo mode — pre-loaded with sample course data
        </p>
      </motion.div>
    </div>
  );
};

export default Landing;
