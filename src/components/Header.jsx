"use client";

import { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

export default function Header({ onSearch, searchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Typography
          variant="h2"
          component="a"
          href="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.8rem",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          News Aggregator
        </Typography>
        <nav>
          <ul className="nav-menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for articles..."
            value={inputValue}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
          />
          <div className="search-actions">
            {inputValue && (
              <IconButton 
                className="search-clear" 
                onClick={handleClear}
                size="small"
                sx={{ 
                  color: '#666',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton 
              className="search-button" 
              onClick={handleSearch}
              size="small"
              sx={{ 
                color: '#667eea',
                padding: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
