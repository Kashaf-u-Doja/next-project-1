import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

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
        return new Error("Too Many Requests: Rate limit exceeded");
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
      q: searchParams.get("q"),
      pageSize: searchParams.get("pageSize") || "20",
      page: searchParams.get("page") || "1",
      language: searchParams.get("language") || "en",
      sortBy: searchParams.get("sortBy") || "publishedAt",
      from: searchParams.get("from"),
      to: searchParams.get("to"),
      sources: searchParams.get("sources"),
    };

    const cleanedParams = cleanParams(params);
    if (
      !cleanedParams.q &&
      !cleanedParams.qInTitle &&
      !cleanedParams.sources &&
      !cleanedParams.domains
    ) {
      return NextResponse.json(
        {
          error:
            "At least one search parameter is required (q, qInTitle, sources, or domains)",
        },
        { status: 400 }
      );
    }

    console.log("API Request - Search Everything:", {
      endpoint: "/everything",
      params: cleanedParams,
    });

    const response = await api.get("/everything", {
      params: cleanedParams,
    });

    console.log("API Success - Search Everything:", {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articlesCount: response.data.articles?.length || 0,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error - Search Everything:", {
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
