"use client";

import React from "react";
import { User, Settings, LogOut, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/components/ui";
import { useClerk, useUser } from "@clerk/nextjs";
import { useTranslation } from "@/i18n/useTranslation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { t } = useTranslation();

  const handleLogout = () => {
    toast.success(t("profile.loggedOutSuccessfully"));
    signOut();
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {t("profile.profile")}
      </h1>

      <div className="md:flex md:items-center gap-6 mb-8 p-6 bg-card rounded-lg border">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
          <User
            size={40}
            className="text-muted-foreground"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
            {user?.emailAddresses[0].emailAddress ===
              process.env.NEXT_PUBLIC_DEMO_USER_EMAIL && t("profile.demoUser")}
          </h2>
          <p className="text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {t("profile.accountActions")}
          </h3>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>{t("profile.logOut")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
