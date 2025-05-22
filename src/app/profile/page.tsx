"use client";

import React from "react";
import { User, Settings, LogOut, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/components/ui";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    toast.success("Logged out successfully");

    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>

      <div className="md:flex md:items-center gap-6 mb-8 p-6 bg-card rounded-lg border">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
          <User
            size={40}
            className="text-muted-foreground"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">Roman</h2>
          <p className="text-muted-foreground">roman@example.com</p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="space-y-1 mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            ACCOUNT SETTINGS
          </h3>

          <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <User size={20} />
              <span>Personal Information</span>
            </div>
            <span>→</span>
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Book size={20} />
              <span>Saved Tours</span>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <span>Appearance</span>
            </div>
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        </div>

        <div className="border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            ACCOUNT ACTIONS
          </h3>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
