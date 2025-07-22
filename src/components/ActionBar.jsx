"use client";

import { Button, Typography } from "@mui/material";
import { FilterList, Settings } from "@mui/icons-material";

export default function ActionBar({
  onOpenFilters,
  onOpenPreferences,
  appliedFilters,
  activePreferences,
  onClearFilters,
  onClearPreferences,
}) {
  const hasFilters =
    appliedFilters &&
    Object.values(appliedFilters).some(
      (value) => value && value !== "general" && value !== "publishedAt"
    );

  const hasPreferences =
    activePreferences &&
    ((activePreferences.sources && activePreferences.sources.length > 0) ||
      (activePreferences.categories &&
        activePreferences.categories.length > 0));

  const formatSourceName = (source) => {
    return source
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="action-bar">
      <div className="action-bar-header">
        <Typography
          variant="h3"
          component="h1"
          sx={{ margin: 0, color: "#333" }}
        >
          Latest News
        </Typography>

        {(hasFilters || hasPreferences) && (
          <div className="applied-data">
            {hasFilters && (
              <div className="filter-section">
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ fontWeight: "600", color: "#555" }}
                >
                  Applied Filters:
                </Typography>
                <div className="tags-container">
                  {appliedFilters.category &&
                    appliedFilters.category !== "general" && (
                      <span className="tag filter-tag">
                        Category:{" "}
                        {appliedFilters.category.charAt(0).toUpperCase() +
                          appliedFilters.category.slice(1)}
                      </span>
                    )}
                  {appliedFilters.source && (
                    <span className="tag filter-tag">
                      Source: {formatSourceName(appliedFilters.source)}
                    </span>
                  )}
                  {appliedFilters.dateFrom && (
                    <span className="tag filter-tag">
                      From: {appliedFilters.dateFrom}
                    </span>
                  )}
                  {appliedFilters.dateTo && (
                    <span className="tag filter-tag">
                      To: {appliedFilters.dateTo}
                    </span>
                  )}
                  {appliedFilters.sortBy &&
                    appliedFilters.sortBy !== "publishedAt" && (
                      <span className="tag filter-tag">
                        Sort:{" "}
                        {appliedFilters.sortBy.charAt(0).toUpperCase() +
                          appliedFilters.sortBy.slice(1)}
                      </span>
                    )}
                  <span
                    className="clear-link"
                    onClick={onClearFilters}
                    title="Clear all filters"
                  >
                    Clear Filters
                  </span>
                </div>
              </div>
            )}

            {hasPreferences && (
              <div className="preferences-section">
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ fontWeight: "600", color: "#555" }}
                >
                  Selected Preferences:
                </Typography>
                <div className="tags-container">
                  {activePreferences.sources &&
                    activePreferences.sources.map((source) => (
                      <span key={source} className="tag preference-tag">
                        {formatSourceName(source)}
                      </span>
                    ))}
                  {activePreferences.categories &&
                    activePreferences.categories.map((category) => (
                      <span key={category} className="tag preference-tag">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    ))}
                  <span
                    className="clear-link preference-clear"
                    onClick={onClearPreferences}
                    title="Clear all preferences"
                  >
                    Clear Preferences
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="action-buttons">
        <Button
          variant="contained"
          startIcon={<FilterList />}
          onClick={onOpenFilters}
          sx={{ mr: 0.4 }}
          color="primary"
        >
          Filter
        </Button>
        <Button
          variant="contained"
          startIcon={<Settings />}
          onClick={onOpenPreferences}
          color="success"
        >
          Preferences
        </Button>
      </div>
    </div>
  );
}
