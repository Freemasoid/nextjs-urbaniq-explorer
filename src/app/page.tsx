"use client";

import React from "react";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/i18n/useTranslation";

const Index: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const features = [
    t("index.features.list.0"),
    t("index.features.list.1"),
    t("index.features.list.2"),
    t("index.features.list.3"),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content (Logo and Text) */}
          <div className="space-y-6 text-center md:text-left md:flex-1">
            {/* App Icon */}
            <div className="mx-auto md:mx-0 flex md:justify-start justify-center">
              <div className="h-32 w-32 md:h-40 md:w-40 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-wander-yellow to-wander-accent/80 flex items-center justify-center">
                  <Image
                    src="/logo_guide.svg"
                    alt="UrbanIQ Explorer"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            </div>

            {/* App Name and Tagline */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-explorer-yellow text-shadow-md text-shadow-gray-700">
                  UrbanIQ
                </span>{" "}
                Explorer
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                {t("index.tagline")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                onClick={() => router.push("/chat")}
                size="lg"
                className="btn-primary px-8 py-6 text-lg h-auto"
              >
                {t("index.cta")}
              </Button>
            </div>
          </div>

          {/* Right Content (Features) */}
          <div className="hidden md:block md:flex-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                {t("index.features.title")}
              </h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                      <svg
                        className="h-3 w-3 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
