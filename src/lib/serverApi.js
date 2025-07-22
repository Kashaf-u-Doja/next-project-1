import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;
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

export async function getTopHeadlines(params = {}) {
  try {
    const defaultParams = {
      pageSize: "20",
      page: "1",
      language: "en",
      sortBy: "publishedAt",
    };

    const requestParams = { ...defaultParams, ...params };

    const cleanedParams = cleanParams(requestParams);

    if (
      cleanedParams.sources &&
      (cleanedParams.category || cleanedParams.country)
    ) {
      delete cleanedParams.category;
      delete cleanedParams.country;
    }

    console.log("Server API Request - Top Headlines:", {
      endpoint: "/top-headlines",
      params: cleanedParams,
    });

    const response = await api.get("/top-headlines", {
      params: cleanedParams,
    });

    console.log("Server API Success - Top Headlines:", {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articlesCount: response.data.articles?.length || 0,
    });

    return response.data;
  } catch (error) {
    console.error("Server API Error - Top Headlines:", {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
      timestamp: new Date().toISOString(),
    });

    const apiError = handleError(error);
    throw apiError;
  }
}

export async function searchEverything(params = {}) {
  try {
    const defaultParams = {
      pageSize: "20",
      page: "1",
      language: "en",
      sortBy: "publishedAt",
    };
    const requestParams = { ...defaultParams, ...params };
    const cleanedParams = cleanParams(requestParams);
    if (
      !cleanedParams.q &&
      !cleanedParams.qInTitle &&
      !cleanedParams.sources &&
      !cleanedParams.domains
    ) {
      throw new Error(
        "At least one search parameter is required (q, qInTitle, sources, or domains)"
      );
    }

    console.log("Server API Request - Search Everything:", {
      endpoint: "/everything",
      params: cleanedParams,
    });

    const response = await api.get("/everything", {
      params: cleanedParams,
    });

    console.log("Server API Success - Search Everything:", {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articlesCount: response.data.articles?.length || 0,
    });

    return response.data;
  } catch (error) {
    console.error("Server API Error - Search Everything:", {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    const apiError = handleError(error);
    throw apiError;
  }
}
