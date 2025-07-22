"use client";
import { Button, Typography } from "@mui/material";
import { formatDate } from "../utils/dateUtils";
import { Settings } from "@mui/icons-material";

export default function ArticleGrid({
  articles,
  loading,
  currentPage,
  totalResults,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading articles...</div>
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <div className="article-card" key={index}>
                  {article.urlToImage && article.urlToImage.trim() !== "" ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="article-image"
                      onError={(e) => {
                        e.target.src = "/assets/default_img.jpg";
                      }}
                    />
                  ) : (
                    <img
                      src="/assets/default_img.jpg"
                      alt={article.title}
                      className="article-image"
                    />
                  )}
                  <div className="article-content">
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "#333",
                        lineHeight: 1.4,
                      }}
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#667eea")}
                        onMouseLeave={(e) => (e.target.style.color = "inherit")}
                      >
                        {article.title}
                      </a>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {article.description}
                    </Typography>
                    <div className="article-meta">
                      <span className="article-source">
                        {article.source.name}
                      </span>
                      <span className="article-date">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="error-message">No articles found</div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <Button
                variant="contained"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                sx={{ mr: 0.4 }}
                color="primary"
              >
                Previous
              </Button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="contained"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                color="primary"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
