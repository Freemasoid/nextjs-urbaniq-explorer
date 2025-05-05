import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, User, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
        <div className="container flex w-full h-14 items-center">
          <div className="flex flex-1 items-center justify-between px-4">
            <Logo />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 container py-4 px-4">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="mobile-nav">
        <Link
          href="/chat"
          className={cn(
            "flex flex-col items-center p-1",
            pathname === "/chat" ? "text-primary" : "text-foreground/70"
          )}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>

        <Link
          href="/new-tour"
          className={cn(
            "flex flex-col items-center p-1",
            pathname === "/new-tour" ? "text-primary" : "text-foreground/70"
          )}
        >
          <Search size={24} />
          <span className="text-xs mt-1">New Tour</span>
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
          <span className="text-xs mt-1">Tours</span>
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
    </div>
  );
};

export default MobileLayout;
