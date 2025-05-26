"use server";

import connect from "./mongodb";
import Tour, { ITour } from "../models/Tour";
import OpenAI from "openai";
import { rateLimiter } from "@/lib/rate-limiter";
import { getClientIP } from "@/lib/get-client-ip";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface TourInput {
  city: string;
  country: string;
  title: string;
  description: string;
  image?: string;
  places: string[];
  userId: string;
}

interface TourQuery {
  city: string;
  country: string;
  language?: string;
}

// Language-specific query templates
const queryTemplates = {
  enUS: {
    query: (
      city: string,
      country: string
    ) => `Find a city ${city} in following country ${country}. If this said city exists in said country, create a list of things users can do in city ${city} country ${country}.
  As soon as you have the list, create a one day tour. Response should be in following JSON format:
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "tour title",
      "description": "description of the city and tour",
      "places": ["short paragraph (no more than 200 words) for first place to visit", "short paragraph (no more than 200 words) for second place to visit","short paragraph (no more than 200 words) for third place to visit"]
    }
  }
  In case you cannot find information on exact ${city}, or ${city} does not exist, or it is not located in country ${country}, response should be in following JSON format:
  {
    "tour": null
  }`,
    systemMessage:
      "You are a city guide helper. Your purpose is to assist users in discovering attractive places to visit in their specified city",
  },
  deDE: {
    query: (
      city: string,
      country: string
    ) => `Finde eine Stadt ${city} im folgenden Land ${country}. Wenn diese besagte Stadt in diesem Land existiert, erstelle eine Liste von Dingen, die Benutzer in der Stadt ${city} im Land ${country} unternehmen können.
  Sobald du die Liste hast, erstelle eine Tagestour. Die Antwort sollte im folgenden JSON-Format sein:
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "Tour-Titel",
      "description": "Beschreibung der Stadt und Tour",
      "places": ["kurzer Absatz (nicht mehr als 200 Wörter) für den ersten Besuchsort", "kurzer Absatz (nicht mehr als 200 Wörter) für den zweiten Besuchsort","kurzer Absatz (nicht mehr als 200 Wörter) für den dritten Besuchsort"]
    }
  }
  Falls du keine Informationen über die genaue Stadt ${city} finden kannst, oder ${city} nicht existiert, oder sie sich nicht im Land ${country} befindet, sollte die Antwort im folgenden JSON-Format sein:
  {
    "tour": null
  }`,
    systemMessage:
      "Du bist ein Stadtführer-Helfer. Dein Zweck ist es, Benutzern dabei zu helfen, attraktive Orte in ihrer angegebenen Stadt zu entdecken. Antworte auf Deutsch.",
  },
  ruRU: {
    query: (
      city: string,
      country: string
    ) => `Найди город ${city} в следующей стране ${country}. Если этот указанный город существует в данной стране, создай список вещей, которые пользователи могут делать в городе ${city} страны ${country}.
  Как только у тебя будет список, создай однодневный тур. Ответ должен быть в следующем JSON формате:
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "название тура",
      "description": "описание города и тура",
      "places": ["короткий абзац (не более 200 слов) для первого места для посещения", "короткий абзац (не более 200 слов) для второго места для посещения","короткий абзац (не более 200 слов) для третьего места для посещения"]
    }
  }
  В случае, если ты не можешь найти информацию о точном городе ${city}, или ${city} не существует, или он не находится в стране ${country}, ответ должен быть в следующем JSON формате:
  {
    "tour": null
  }`,
    systemMessage:
      "Ты помощник городского гида. Твоя цель - помочь пользователям открыть привлекательные места для посещения в их указанном городе. Отвечай на русском языке.",
  },
};

export async function chatResponse(messages: ChatMessage[]) {
  try {
    // Get client IP and check rate limit
    const clientIP = await getClientIP();

    if (!rateLimiter.isAllowed(clientIP)) {
      const resetTime = rateLimiter.getResetTime(clientIP);
      const hoursUntilReset = Math.ceil(resetTime / (1000 * 60 * 60));

      return {
        role: "assistant" as const,
        content: `Demo limit reached. You have made too many requests. Please try again in ${hoursUntilReset} hours. Remaining requests: ${rateLimiter.getRemainingRequests(
          clientIP
        )}`,
      };
    }

    const resp = await openAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a city guide helper. Your purpose is to assist users in discovering attractive places to visit in their specified city.",
        },
        ...messages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    return resp.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTour({
  city,
  country,
}: TourQuery): Promise<ITour | null> {
  try {
    await connect();
    const tour = await Tour.findOne({
      city: { $regex: new RegExp(`^${city}$`, "i") },
      country: { $regex: new RegExp(`^${country}$`, "i") },
    }).lean();
    if (!tour) return null;
    return JSON.parse(JSON.stringify(tour)) as ITour;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

export async function getAllTours(searchParam?: string): Promise<ITour[]> {
  try {
    await connect();

    if (!searchParam) {
      const tours = await Tour.find({}).sort({ city: 1 }).lean();
      return JSON.parse(JSON.stringify(tours)) as ITour[];
    }

    const tours = await Tour.find({
      $or: [
        {
          city: {
            $regex: searchParam,
            $options: "i",
          },
        },
        {
          country: {
            $regex: searchParam,
            $options: "i",
          },
        },
      ],
    })
      .sort({ city: 1 })
      .lean();

    return JSON.parse(JSON.stringify(tours)) as ITour[];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export async function getUserTours(
  userId: string,
  searchParam?: string
): Promise<ITour[]> {
  try {
    await connect();

    const baseQuery = { userId };

    if (!searchParam) {
      const tours = await Tour.find(baseQuery).sort({ city: 1 }).lean();
      return JSON.parse(JSON.stringify(tours)) as ITour[];
    }

    const tours = await Tour.find({
      ...baseQuery,
      $or: [
        {
          city: {
            $regex: searchParam,
            $options: "i",
          },
        },
        {
          country: {
            $regex: searchParam,
            $options: "i",
          },
        },
      ],
    })
      .sort({ city: 1 })
      .lean();

    return JSON.parse(JSON.stringify(tours)) as ITour[];
  } catch (error) {
    console.error("Error fetching user tours:", error);
    return [];
  }
}

export async function genTourRes({
  city,
  country,
  language = "enUS",
}: TourQuery) {
  // Check rate limit for tour generation as well
  const clientIP = await getClientIP();

  if (!rateLimiter.isAllowed(clientIP)) {
    const resetTime = rateLimiter.getResetTime(clientIP);
    const hoursUntilReset = Math.ceil(resetTime / (1000 * 60 * 60));
    throw new Error(
      `Demo limit reached. Please try again in ${hoursUntilReset} hours.`
    );
  }

  // Get the appropriate template for the selected language
  const template =
    queryTemplates[language as keyof typeof queryTemplates] ||
    queryTemplates.enUS;
  const query = template.query(city, country);

  try {
    const resp = await openAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content: template.systemMessage,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const content = resp.choices[0].message.content;
    if (!content) {
      return null;
    }

    const data = JSON.parse(content);

    if (!data.tour) {
      return null;
    }

    return data.tour;
  } catch (error) {
    console.error("Error generating tour:", error);
    return null;
  }
}

export async function createTour(tour: TourInput): Promise<ITour | null> {
  try {
    await connect();
    const newTour = await Tour.create(tour);
    const plainTour = newTour.toObject();
    return JSON.parse(JSON.stringify(plainTour)) as ITour;
  } catch (error) {
    console.error("Error creating tour:", error);
    return null;
  }
}

export async function getTourById(id: string): Promise<ITour | null> {
  try {
    await connect();
    const tour = await Tour.findById(id).lean();
    if (!tour) return null;
    return JSON.parse(JSON.stringify(tour)) as ITour | null;
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    return null;
  }
}
