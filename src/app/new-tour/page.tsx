"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/useTranslation";
import { useRouter } from "next/navigation";

const NewTour: React.FC = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const suggestions = [
    t("newTour.suggestions.0"),
    t("newTour.suggestions.1"),
    t("newTour.suggestions.2"),
    t("newTour.suggestions.3"),
  ];

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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        {t("newTour.create")}
      </h1>

      <div className="md:grid md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3 mb-8">
          <h2 className="text-xl font-semibold mb-2">{t("newTour.whereTo")}</h2>
          <p className="text-muted-foreground mb-6">
            {t("newTour.whereToDescription")}
          </p>

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
                htmlFor="country"
                className="block text-sm font-medium mb-1"
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
              type="submit"
              className="w-full md:w-auto btn-primary mt-6 px-8"
              disabled={isLoading}
            >
              {isLoading ? t("newTour.generating") : t("newTour.generateTour")}
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">
              {t("newTour.travelSuggestions")}
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex gap-2"
                >
                  <span className="text-primary">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
