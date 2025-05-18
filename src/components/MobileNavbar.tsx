import Link from "next/link";
import { Home, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/useTranslation";

const MobileNavbar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="mobile-nav">
      <Link
        href="/chat"
        className={cn(
          "flex flex-col items-center p-1",
          pathname === "/chat" ? "text-primary" : "text-foreground/70"
        )}
      >
        <Home size={24} />
        <span className="text-xs mt-1">{t("nav.chat")}</span>
      </Link>

      <Link
        href="/new-tour"
        className={cn(
          "flex flex-col items-center p-1",
          pathname === "/new-tour" ? "text-primary" : "text-foreground/70"
        )}
      >
        <Search size={24} />
        <span className="text-xs mt-1">{t("nav.newTour")}</span>
      </Link>

      <Link
        href="/tours"
        className={cn(
          "flex flex-col items-center p-1",
          pathname === "/tours" ? "text-primary" : "text-foreground/70"
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
        <span className="text-xs mt-1">{t("nav.tours")}</span>
      </Link>

      <Link
        href="/profile"
        className={cn(
          "flex flex-col items-center p-1",
          pathname === "/profile" ? "text-primary" : "text-foreground/70"
        )}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </nav>
  );
};

export default MobileNavbar;
