"use client";

import React from "react";
import { User, Settings, LogOut, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

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
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <User
            size={30}
            className="text-muted-foreground"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Roman</h2>
          <p className="text-muted-foreground">roman@example.com</p>
        </div>
      </div>

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

      <div className="border-t pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
