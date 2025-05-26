"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { useQuery } from "@tanstack/react-query";
import { getTourById, getUnsplashImageByCityName } from "@/utils/actions";
import Image from "next/image";
import { use } from "react";

interface TourDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const { t } = useTranslation();
  const { id } = use(params);

  const {
    data: tour,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: async () => {
      const result = await getTourById(id);
      return result;
    },
    enabled: !!id,
  });

  const { data: tourImage, isLoading: isImageLoading } = useQuery({
    queryKey: ["tour-image", tour?.city],
    queryFn: async () => {
      if (!tour?.city) return null;
      return await getUnsplashImageByCityName(tour.city);
    },
    enabled: !!tour?.city,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching tour:", error);
    return (
      <div className="text-center py-10">
        <p>
          Error loading tour:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Link
          href="/tours"
          className="btn-primary mt-4 inline-block"
        >
          {t("tourDetail.backToTours")}
        </Link>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="text-center py-10">
        <p>{t("tourDetail.noTourFound")}</p>
        <p className="text-sm text-muted-foreground mt-2">Tour ID: {id}</p>
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

      {tourImage && (
        <div className="rounded-lg overflow-hidden h-48 mb-6 relative">
          <Image
            src={tourImage}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}

      {isImageLoading && (
        <div className="rounded-lg bg-muted h-48 mb-6 flex items-center justify-center">
          <p className="text-muted-foreground">
            {t("tourDetail.loadingImage")}
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>

      <p className="text-muted-foreground mb-6">{tour.description}</p>

      <div className="space-y-6">
        {tour.places.map((place, index) => (
          <div
            key={index}
            className="bg-card border rounded-lg p-4"
          >
            <p>{place}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
