"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import Link from "next/link";

const NotFound = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t("errors.pageNotFound")}</p>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {t("errors.returnToHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
