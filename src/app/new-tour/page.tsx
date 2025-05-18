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
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Create New Tour</h1>

      <div className="md:grid md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Where do you want to go?
          </h2>
          <p className="text-muted-foreground mb-6">
            Enter a city and country to generate a personalized tour itinerary.
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
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Paris"
                className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. France"
                className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto btn-primary mt-6 px-8"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Tour"}
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Travel Suggestions</h3>
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
                <span>Kyoto, Japan - Cultural Capital</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Barcelona, Spain - Gaudi's Masterpieces</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
