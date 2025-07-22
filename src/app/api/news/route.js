import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// Debug logging for production
console.log("Environment check:", {
  hasApiKey: !!API_KEY,
  apiKeyLength: API_KEY?.length || 0,
  nodeEnv: process.env.NODE_ENV
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-API-Key": API_KEY,
  },
});

function handleError(error) {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return new Error(
          "Bad Request: " + (data.message || "Invalid parameters")
        );
      case 401:
        return new Error("Unauthorized: Please check your API key");
      case 429:
        const rateLimitMessage = data.message || "Rate limit exceeded";
        return new Error(
          `Rate Limit Exceeded: ${rateLimitMessage}. Try again later or upgrade your NewsAPI plan.`
        );
      case 500:
        return new Error("Server Error: Please try again later");
      default:
        return new Error("API Error: " + (data.message || "Unknown error"));
    }
  } else if (error.request) {
    return new Error("Network Error: Please check your internet connection");
  } else {
    return new Error("Error: " + error.message);
  }
}

function cleanParams(params) {
  const cleanedParams = { ...params };
  Object.keys(cleanedParams).forEach((key) => {
    if (
      cleanedParams[key] === "" ||
      cleanedParams[key] === null ||
      cleanedParams[key] === undefined
    ) {
      delete cleanedParams[key];
    }
  });
  return cleanedParams;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      pageSize: searchParams.get("pageSize") || "20",
      page: searchParams.get("page") || "1",
      category: searchParams.get("category"),
      sources: searchParams.get("sources"),
      country: searchParams.get("country"),
    };
    const cleanedParams = cleanParams(params);
    if (cleanedParams.sources) {
      delete cleanedParams.country;
      delete cleanedParams.category;
    } else {
      cleanedParams.country = cleanedParams.country || "us";
    }
    console.log("API Request - Top Headlines:", {
      endpoint: "/top-headlines",
      params: cleanedParams,
    });

    const response = await api.get("/top-headlines", {
      params: cleanedParams,
    });

    console.log("API Success - Top Headlines:", {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articlesCount: response.data.articles?.length || 0,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error - Top Headlines:", {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    const apiError = handleError(error);
    return NextResponse.json(
      { error: apiError.message },
      { status: error.response?.status || 500 }
    );
  }
}
