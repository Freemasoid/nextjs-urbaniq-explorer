"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/i18n/useTranslation";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Sparkles, MapPin, Clock, Loader2 } from "lucide-react";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTour, genTourRes, createTour } from "@/utils/actions";

interface TourDestination {
  city: string;
  country: string;
  language?: string;
}

const NewTour: React.FC = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useTranslation();
  const router = useRouter();
  const { user } = useUser();
  const { data: rateLimitInfo } = useRateLimit();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (destination: TourDestination) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const existingTour = await getTour(destination);

      if (existingTour) return existingTour;

      const newTour = await genTourRes(destination);

      if (newTour) {
        const createdTour = await createTour({
          ...newTour,
          userId: user.id,
        });
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        return createdTour;
      }

      throw new Error("Failed to generate tour");
    },
    onSuccess: (tour) => {
      setIsLoading(false);
      toast.success(t("newTour.success"));
      if (tour?._id) {
        router.push(`/tours/${tour._id}`);
      } else {
        router.push("/tours");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message || t("errors.error"));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Please sign in to create tours");
      return;
    }

    const destination: TourDestination = {
      city: city.trim(),
      country: country.trim(),
      language: language,
    };

    if (!destination.city || !destination.country) {
      toast.error("Please enter both city and country");
      return;
    }

    setIsLoading(true);
    mutate(destination);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const suggestions = [
    {
      city: "Berlin",
      country: "Germany",
      description: "City of Techno",
    },
    {
      city: "Tokyo",
      country: "Japan",
      description: "City of Technology",
    },
    {
      city: "Paris",
      country: "France",
      description: "City of Love",
    },
    {
      city: "Rome",
      country: "Italy",
      description: "City of History",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10">
          <Sparkles className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t("newTour.createNewTour")}
          </h1>
          <p className="text-muted-foreground">
            {t("newTour.createNewTourDescription")}
          </p>

          {/* Rate Limit Info */}
          {user?.emailAddresses[0].emailAddress ===
            process.env.NEXT_PUBLIC_DEMO_USER_EMAIL &&
            rateLimitInfo && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {rateLimitInfo.remaining} {t("profile.requestsRemaining")}
                  {rateLimitInfo.resetTimeHours > 0 && (
                    <span className="text-xs block">
                      {t("profile.resetsIn")} {rateLimitInfo.resetTimeHours}h
                    </span>
                  )}
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="tour-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold">
              {t("newTour.destination")}
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            {t("newTour.destinationDescription")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium mb-2"
              >
                {t("newTour.city")}
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t("newTour.cityPlaceholder")}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-2"
              >
                {t("newTour.country")}
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={t("newTour.countryPlaceholder")}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary mt-6 py-3 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? t("newTour.generating") : t("newTour.generateTour")}
            </button>
          </form>
        </div>

        <div className="tour-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            {t("newTour.popularDestinations")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => {
                  setCity(item.city);
                  setCountry(item.country);
                }}
              >
                <div className="font-medium text-sm">
                  {item.city}, {item.country}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
