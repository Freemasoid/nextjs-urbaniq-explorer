import React from "react";
import { usePathname } from "next/navigation";
import { MobileNavbar } from "@/components";
import { Header } from "@/components/ui";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/sign-in" || pathname === "/sign-up";

  // For home/login page, render children directly without header/navbar
  if (isHomePage || isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-[100dvh]">
      <Header />

      <main className="flex-1 overflow-auto pb-16">
        <div className="py-4 px-4 h-full">{children}</div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MobileLayout;
