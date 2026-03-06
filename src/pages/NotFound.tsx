import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SyllabLogo } from "@/components/SyllabLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <SyllabLogo className="h-6 text-xl" />
          <h1 className="text-4xl font-bold">404</h1>
        </div>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
