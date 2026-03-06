import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SyllabLogoProps = {
  className?: string;
};

export function SyllabLogo({ className }: SyllabLogoProps) {
  return (
    <Link to="/" className={cn("inline-flex items-center font-semibold text-foreground no-underline", className)}>
      <span className="text-primary">syllab</span>
      <span className="text-muted-foreground">.ai</span>
    </Link>
  );
}
