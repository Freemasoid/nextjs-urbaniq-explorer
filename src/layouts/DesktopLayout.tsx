"use client";

import React from "react";
import { DesktopSidebar } from "@/components";
import { Header } from "@/components/ui";
import { usePathname } from "next/navigation";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // For home page, render children directly without the app layout
  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DesktopSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 ml-64">{children}</main>
      </div>
    </div>
  );
};

export default DesktopLayout;
