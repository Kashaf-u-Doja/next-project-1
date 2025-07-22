"use client";
import { Button, Slide } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Close as CloseIcon } from "@mui/icons-material";
import ActionBar from "@/components/ActionBar";
import ArticleGrid from "@/components/ArticleGrid";
import FilterDrawer from "@/components/FilterDrawer";
import Header from "@/components/Header";
import PreferencesModal from "@/components/PreferencesModal";
import { getTopHeadlines, searchEverything } from "@/lib/newsApi";
import React, { useEffect, useRef, useState } from "react";

function NewsApiPage({
  initialArticles,
  initialTotal,
  initialError,
  availableCategories,
  availableSources,
}) {
  const notistackRef = useRef();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "general",
    source: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "publishedAt",
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const pageSize = 12;

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem("newsPreferences");
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences(parsedPreferences);
        console.log("Loaded preferences:", parsedPreferences);
      } catch (error) {
        console.error("Error parsing saved preferences:", error);
        localStorage.removeItem("newsPreferences");
      }
    }
    setArticles(initialArticles || []);
    setTotalResults(initialTotal || 0);
    setLoading(false);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;

    if (searchQuery.trim()) {
      fetchArticlesWithSearch();
    } else {
      fetchArticles();
    }
  }, [filters, currentPage, preferences, preferencesLoaded]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchArticlesWithSearch();
    } else {
      fetchArticles();
    }
  }, [searchQuery]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      let activeCategory = filters.category;
      let activeSource = filters.source;
      if (preferences.sources && preferences.sources.length > 0) {
        activeSource = preferences.sources.join(",");
        console.log("Using preferred sources:", activeSource);
      }

      if (preferences.categories && preferences.categories.length > 0) {
        activeCategory = preferences.categories[0];
        console.log("Using preferred category:", activeCategory);
      }
      const hasDateFilters = filters.dateFrom || filters.dateTo;

      if (hasDateFilters) {
        const apiParams = {
          pageSize,
          page: currentPage,
          sortBy: filters.sortBy,
          from: filters.dateFrom,
          to: filters.dateTo,
        };
        if (activeSource) {
          apiParams.sources = activeSource;
        } else {
          const categorySearchMap = {
            general: "*",
            business: "business OR economy OR finance OR market",
            entertainment: "entertainment OR celebrity OR movie OR music OR tv",
            health: "health OR medical OR medicine OR healthcare OR wellness",
            science: "science OR research OR study OR discovery OR scientific",
            sports:
              "sports OR football OR basketball OR soccer OR baseball OR olympic",
            technology:
              "technology OR tech OR AI OR software OR digital OR innovation",
          };
          apiParams.q = categorySearchMap[activeCategory] || activeCategory;
        }

        console.log(
          "Fetching articles with date filters using /everything endpoint:",
          apiParams
        );
        const response = await searchEverything(apiParams);
        console.log("API Success - /everything endpoint:", {
          status: response.status,
          totalResults: response.totalResults,
          articlesCount: response.articles?.length || 0,
          // timestamp: new Date().toISOString(),
          requestParams: apiParams,
        });
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } else {
        const apiParams = {
          pageSize,
          page: currentPage,
        };
        if (activeSource) {
          apiParams.sources = activeSource;
        } else {
          apiParams.category = activeCategory;
          apiParams.country = "us";
        }

        console.log(
          "Fetching articles using /top-headlines endpoint:",
          apiParams
        );
        const response = await getTopHeadlines(apiParams);
        console.log("API Success - /top-headlines endpoint:", {
          status: response.status,
          totalResults: response.totalResults,
          articlesCount: response.articles?.length || 0,
          // timestamp: new Date().toISOString(),
          requestParams: apiParams,
        });
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      }
    } catch (err) {
      console.error("Error fetching articles:", {
        error: err.message,
        stack: err.stack,
        // timestamp: new Date().toISOString(),
      });
      let errorMessage;
      if (
        err.message.toLowerCase().includes("rate limit") ||
        err.message.toLowerCase().includes("429") ||
        err.message.toLowerCase().includes("too many requests")
      ) {
        errorMessage = err.message;
        enqueueSnackbar(
          "Rate limit exceeded. Please wait before making more requests.",
          {
            variant: "warning",
          }
        );
      } else {
        errorMessage = "Failed to fetch articles. Please try again.";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticlesWithSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = {
        q: searchQuery,
        sortBy: filters.sortBy,
        from: filters.dateFrom,
        to: filters.dateTo,
        sources: filters.source,
        pageSize,
        page: currentPage,
      };

      console.log("SEARCH REQUEST:", {
        searchQuery: searchQuery,
        requestParams: searchParams,
        // timestamp: new Date().toISOString(),
        userAction: "search",
      });

      const response = await searchEverything(searchParams);

      console.log("SEARCH SUCCESS RESPONSE:", {
        status: response.status,
        totalResults: response.totalResults,
        articlesCount: response.articles?.length || 0,
        searchQuery: searchQuery,
        // timestamp: new Date().toISOString(),
        responseData: {
          firstArticleTitle:
            response.articles?.[0]?.title || "No articles found",
          lastArticleTitle:
            response.articles?.[response.articles?.length - 1]?.title ||
            "Single article",
        },
        requestParams: searchParams,
      });

      setArticles(response.articles);
      setTotalResults(response.totalResults);
    } catch (err) {
      console.error("SEARCH ERROR:", {
        searchQuery: searchQuery,
        error: err.message,
        stack: err.stack,
        // timestamp: new Date().toISOString(),
        requestParams: {
          q: searchQuery,
          sortBy: filters.sortBy,
          from: filters.dateFrom,
          to: filters.dateTo,
          sources: filters.source,
          pageSize,
          page: currentPage,
        },
      });
      let errorMessage;
      if (
        err.message.toLowerCase().includes("rate limit") ||
        err.message.toLowerCase().includes("429") ||
        err.message.toLowerCase().includes("too many requests")
      ) {
        errorMessage = err.message;
        enqueueSnackbar(
          "Rate limit exceeded. Please wait before making more requests.",
          {
            variant: "warning",
          }
        );
      } else {
        errorMessage = "Failed to search articles. Please try again.";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    console.log("Applying filters:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePreferencesChange = (newPreferences) => {
    console.log("Saving preferences:", newPreferences);
    setPreferences(newPreferences);
    setShowPreferences(false);
    setCurrentPage(1);
    localStorage.setItem("newsPreferences", JSON.stringify(newPreferences));
    const hasActivePreferences =
      newPreferences.sources.length > 0 || newPreferences.categories.length > 0;
    if (hasActivePreferences) {
      enqueueSnackbar("Preferences saved successfully!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("All preferences cleared.", { variant: "info" });
    }
  };

  const handleClearFilters = () => {
    const resetFilters = {
      category: "general",
      source: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "publishedAt",
    };
    setFilters(resetFilters);
    setCurrentPage(1);
    enqueueSnackbar("All filters cleared.", { variant: "info" });
  };

  const handleClearPreferences = () => {
    const clearedPreferences = {
      sources: [],
      categories: [],
      authors: [],
    };
    setPreferences(clearedPreferences);
    setCurrentPage(1);
    localStorage.setItem("newsPreferences", JSON.stringify(clearedPreferences));
    enqueueSnackbar("All preferences cleared.", { variant: "info" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => (
          <Button className="snackbar-cross-icon" onClick={onClickDismiss(key)}>
            <CloseIcon />
          </Button>
        )}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
      >
        <Header onSearch={handleSearch} searchQuery={searchQuery} />
        <main className="container">
          <ActionBar
            onOpenFilters={() => setShowFilterDrawer(true)}
            onOpenPreferences={() => setShowPreferences(true)}
            appliedFilters={filters}
            activePreferences={preferences}
            onClearFilters={handleClearFilters}
            onClearPreferences={handleClearPreferences}
          />

          {error && (
            <div
              className={`error-message ${
                error.toLowerCase().includes("rate limit") ||
                error.toLowerCase().includes("429") ||
                error.toLowerCase().includes("too many requests")
                  ? "rate-limit"
                  : ""
              }`}
            >
              {error.toLowerCase().includes("rate limit") ||
              error.toLowerCase().includes("429") ||
              error.toLowerCase().includes("too many requests") ? (
                <>
                  <strong>NewsAPI Rate Limit Reached</strong>
                  <div>
                    You've exceeded the free tier limit of 100 requests per day
                    (50 per 12 hours).
                  </div>
                  <div className="error-details">
                    💡 The app will continue to work with existing data.
                    Consider upgrading to a paid NewsAPI plan for unlimited
                    access.
                  </div>
                </>
              ) : (
                error
              )}
            </div>
          )}

          <ArticleGrid
            articles={articles}
            loading={loading}
            currentPage={currentPage}
            totalResults={totalResults}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />

          <FilterDrawer
            isOpen={showFilterDrawer}
            onClose={() => setShowFilterDrawer(false)}
            filters={filters}
            onApplyFilters={handleFilterChange}
            availableCategories={availableCategories}
            availableSources={availableSources}
          />

          {showPreferences && (
            <PreferencesModal
              preferences={preferences}
              onSave={handlePreferencesChange}
              onClose={() => setShowPreferences(false)}
              availableCategories={availableCategories}
              availableSources={availableSources}
            />
          )}
        </main>
      </SnackbarProvider>
    </>
  );
}

export default NewsApiPage;
