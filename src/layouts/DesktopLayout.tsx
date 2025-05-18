"use client";

import React from "react";
import { DesktopSidebar } from "@/components";
import { Header } from "@/components/ui";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
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
