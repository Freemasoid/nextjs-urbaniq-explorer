"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Plus } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { ITour } from "@/models/Tour";
import { getUserTours } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const ToursPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const { t } = useTranslation();

  const { data: tours } = useQuery({
    queryKey: ["tours", user?.id],
    queryFn: () => getUserTours(user?.id || ""),
  });

  const filteredTours = tours?.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10">
          <MapPin className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t("tours.yourTours")}
          </h1>
          <p className="text-muted-foreground">
            {t("tours.discoverAndManage")}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="tour-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold">{t("tours.searchTours")}</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            {t("tours.searchToursDescription")}
          </p>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder={t("tours.searchToursPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {filteredTours?.length === 0 ? (
          <div className="tour-card p-6 text-center">
            <div className="p-3 rounded-full bg-muted/50 w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {t("tours.noToursFound")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? t("tours.tryDifferentSearchTerm")
                : t("tours.youHavenToursYet")}
            </p>
            <Link
              href="/new-tour"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {t("tours.createNewTour")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTours?.map((tour, index) => (
              <Link
                href={`/tours/${tour._id}`}
                key={index}
                className="block"
              >
                <div className="tour-card hover:border-primary p-6 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg leading-tight pr-4">
                      {tour.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-muted rounded-full">
                      {tour.city}
                    </span>

                    <span className="text-xs px-3 py-1 bg-muted rounded-full">
                      {tour.country}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursPage;
