import NewsApiPage from "@/WebPages/NewsApi/NewsApiPage";
import { getTopHeadlines } from "@/lib/serverApi";

export default async function Home() {
  const availableCategories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const availableSources = [
    "bbc-news",
    "cnn",
    "reuters",
    "associated-press",
    "the-guardian-uk",
    "the-new-york-times",
    "techcrunch",
    "espn",
    "bloomberg",
    "time",
  ];

  let initialArticles = [];
  let initialTotal = 0;
  let initialError = null;

  try {
    const response = await getTopHeadlines({
      category: "general",
      country: "us",
      pageSize: 12,
      page: 1,
    });

    initialArticles = response.articles || [];
    initialTotal = response.totalResults || 0;
  } catch (error) {
    console.error("Error fetching initial articles:", error);
    initialError = error.message;
    if (error.message.includes("Rate limit") || error.message.includes("429")) {
      initialError =
        "NewsAPI rate limit exceeded. The app will load with client-side data shortly. Consider upgrading to a paid NewsAPI plan for unlimited requests.";
    }
  }

  return (
    <>
      <NewsApiPage
        initialArticles={initialArticles}
        initialTotal={initialTotal}
        initialError={initialError}
        availableCategories={availableCategories}
        availableSources={availableSources}
      />
    </>
  );
}
