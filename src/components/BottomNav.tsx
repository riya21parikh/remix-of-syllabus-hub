import { useLocation, useNavigate } from "react-router-dom";
import { LayoutList, CalendarDays, BookOpen, Upload, LinkIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/dashboard", label: "Home", icon: LayoutList },
  { path: "/calendar", label: "Calendar", icon: CalendarDays },
  { path: "/courses", label: "Courses", icon: BookOpen },
  { path: "/upload", label: "Upload", icon: Upload },
  { path: "/resources", label: "Resources", icon: LinkIcon },
  { path: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around gap-0 py-2 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-shrink-0 flex-col items-center gap-0.5 px-1.5 py-1.5 text-xs transition-colors min-w-[52px]",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
