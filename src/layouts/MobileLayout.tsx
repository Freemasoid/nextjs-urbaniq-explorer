import React from "react";
import { usePathname } from "next/navigation";
import { MobileNavbar } from "@/components";
import { Header } from "@/components/ui";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 py-4 px-4">{children}</main>

      {/* Bottom Navigation Bar */}
      <MobileNavbar />
    </div>
  );
};

export default MobileLayout;
