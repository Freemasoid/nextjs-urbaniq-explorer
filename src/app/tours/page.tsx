"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface Tour {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  tags: string[];
}

const SAMPLE_TOURS: Tour[] = [
  {
    id: "1",
    title: "Exploring the Vibrant City of Zürich",
    description:
      "Zürich, the largest city in Switzerland, is known for its picturesque old town, stunning lake views, and vibrant cultural scene.",
    city: "Zürich",
    country: "Switzerland",
    tags: ["Zürich", "Schweiz"],
  },
  {
    id: "2",
    title: "The Magic of Paris in 24 Hours",
    description:
      "Experience the romantic City of Light with this perfectly crafted one-day itinerary covering the must-see sights.",
    city: "Paris",
    country: "France",
    tags: ["Paris", "France"],
  },
  {
    id: "3",
    title: "Barcelona: Gaudí, Beaches and Tapas",
    description:
      "Discover the architectural wonders, Mediterranean beaches and culinary delights of Catalunya's vibrant capital.",
    city: "Barcelona",
    country: "Spain",
    tags: ["Barcelona", "Spain"],
  },
];

const ToursPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tours] = useState<Tour[]>(SAMPLE_TOURS);
  const { t } = useTranslation();

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Tours</h1>

      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by city or country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTours.length === 0 ? (
          <div className="text-center py-8 col-span-full">
            <p className="text-muted-foreground">
              No tours found. Try a different search or create a new tour.
            </p>
            <Link
              href="/new-tour"
              className="btn-primary inline-block mt-4"
            >
              Create New Tour
            </Link>
          </div>
        ) : (
          filteredTours.map((tour) => (
            <Link
              href={`/tours/${tour.id}`}
              key={tour.id}
              className="block"
            >
              <div className="tour-card hover:border-primary p-4 h-full">
                <h2 className="font-semibold text-lg">{tour.title}</h2>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-3">
                  {tour.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tour.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default ToursPage;
