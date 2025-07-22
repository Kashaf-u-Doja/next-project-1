import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export async function getTopHeadlines(params = {}) {
  try {
    const response = await api.get("/news", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch headlines");
  }
}

export async function searchEverything(params = {}) {
  try {
    const response = await api.get("/news/search", { params });
    return response.data;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw new Error(error.response?.data?.error || "Failed to search articles");
  }
}
