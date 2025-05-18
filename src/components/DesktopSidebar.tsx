import React from "react";
import Link from "next/link";
import { Home, Search, User, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-sidebar">
      <div className="flex flex-col flex-1 overflow-y-auto pt-14">
        <nav className="flex-1 px-4 py-6 space-y-6">
          <div className="space-y-2">
            <div className="space-y-1">
              <Link
                href="/chat"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === "/chat"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Home
                  size={18}
                  className="mr-2"
                />
                {t("nav.chat")}
              </Link>

              <Link
                href="/new-tour"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === "/new-tour"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Search
                  size={18}
                  className="mr-2"
                />
                {t("nav.newTour")}
              </Link>

              <Link
                href="/tours"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === "/tours"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <List
                  size={18}
                  className="mr-2"
                />
                {t("nav.tours")}
              </Link>

              <Link
                href="/profile"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === "/profile"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <User
                  size={18}
                  className="mr-2"
                />
                {t("nav.profile")}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
