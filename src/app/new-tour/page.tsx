"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/useTranslation";
import { useRouter } from "next/navigation";

const NewTour: React.FC = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city || !country) {
      toast.error(t("errors.cityCountryEmpty"));
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success(t("newTour.success"));
      router.push("/tours");
    }, 2000);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8 text-center">
        {t("newTour.create")}
      </h1>

      <div className="mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{t("newTour.whereTo")}</h2>
          <p className="text-muted-foreground mb-6">
            {t("newTour.whereToDescription")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium mb-1"
            >
              {t("newTour.city")}
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("newTour.cityPlaceholder")}
              className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm mb-1 font-medium"
            >
              {t("newTour.country")}
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t("newTour.countryPlaceholder")}
              className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            className="w-full btn-primary mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? t("newTour.generating") : t("newTour.generateTour")}
          </button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">{t("newTour.travelSuggestions")}</h3>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Paris, France - City of Lights</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Rome, Italy - Eternal City</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Barcelona, Spain - Gaudi's Masterpieces</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Kyoto, Japan - Cultural Capital</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NewTour;
