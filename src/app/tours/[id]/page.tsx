"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface TourStop {
  title: string;
  description: string;
}

interface TourDetailData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  city: string;
  country: string;
  stops: TourStop[];
}

const SAMPLE_TOUR_DETAILS: Record<string, TourDetailData> = {
  "1": {
    id: "1",
    title: "Exploring the Vibrant City of Zürich",
    description:
      "Zürich, the largest city in Switzerland, is known for its picturesque old town, stunning lake views, and vibrant cultural scene. This one-day tour will take you through some of the must-visit places in Zürich, offering a mix of history, nature, and modern attractions.",
    imageUrl:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    city: "Zürich",
    country: "Switzerland",
    stops: [
      {
        title: "Bahnhofstrasse",
        description:
          "Start your day by visiting the iconic Bahnhofstrasse, one of the world's most exclusive shopping streets. Stroll along this bustling avenue lined with luxury boutiques, designer stores, and charming cafes. Don't miss out on exploring the historic buildings and architecture that add to the charm of this area.",
      },
      {
        title: "Lake Zürich",
        description:
          "Next, head to the beautiful Lake Zürich for a relaxing boat cruise. Enjoy the scenic views of the city skyline, the Swiss Alps in the distance, and the serene waters of the lake. You can also take a leisurely walk along the promenade or relax in one of the lakeside parks.",
      },
      {
        title: "Kunsthaus Zürich",
        description:
          "Conclude your day with a visit to the Kunsthaus Zürich, one of the leading art museums in Switzerland. Explore its impressive collection of modern and contemporary art, including works by Swiss artists and international masters. The museum's architecture itself is a sight to behold.",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Historical Tour of Berlin",
    description:
      "Discover Berlin's rich history and vibrant culture through this comprehensive tour. From World War II landmarks to modern architectural marvels, experience the city's transformation and resilience firsthand.",
    imageUrl:
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    city: "Berlin",
    country: "Germany",
    stops: [
      {
        title: "Brandenburg Gate",
        description:
          "Begin your journey at this iconic 18th-century neoclassical monument, which has become a symbol of unity and peace in Berlin. Learn about its historical significance through various periods of German history.",
      },
      {
        title: "Berlin Wall Memorial",
        description:
          "Visit this preserved section of the Berlin Wall and its memorial, commemorating the division of the city during the Cold War and honoring those who lost their lives attempting to cross from East to West Berlin.",
      },
      {
        title: "Museum Island",
        description:
          "End your tour at this UNESCO World Heritage site housing five world-renowned museums. Explore treasures from ancient Egypt, Byzantium, and beyond in this cultural center located in the heart of Berlin.",
      },
    ],
  },
};

interface TourDetailPageProps {
  params: {
    id: string;
  };
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = params;
  const tour = SAMPLE_TOUR_DETAILS[id];
  const { t } = useTranslation();
  if (!tour) {
    return (
      <div className="text-center py-10">
        <p>{t("tourDetail.noTourFound")}</p>
        <Link
          href="/tours"
          className="btn-primary mt-4 inline-block"
        >
          {t("tourDetail.backToTours")}
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <Link
        href="/tours"
        className="flex items-center gap-1 mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={18} />
        <span>{t("tourDetail.backToTours")}</span>
      </Link>

      {tour.imageUrl && (
        <div className="rounded-lg overflow-hidden h-48 mb-6">
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>

      <p className="text-muted-foreground mb-6">{tour.description}</p>

      <div className="space-y-6">
        {tour.stops.map((stop, index) => (
          <div
            key={index}
            className="bg-card border rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg mb-2">{stop.title}</h3>
            <p>{stop.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="btn-primary flex-1">
          {t("tourDetail.shareTour")}
        </button>
        <button className="bg-card border rounded-full px-4 py-2.5 hover:bg-muted transition-colors flex-1">
          {t("tourDetail.saveToFavorites")}
        </button>
      </div>
    </div>
  );
}
