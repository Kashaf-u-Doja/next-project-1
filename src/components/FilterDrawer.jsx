"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  availableCategories,
  availableSources,
}) {
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const handleChange = (field, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, [field]: value };

      if (field === "source" && value) {
        return {
          ...newFilters,
          category: "general",
        };
      }
      if (field === "category" && value !== "general") {
        return {
          ...newFilters,
          source: "",
        };
      }
      if (field === "sortBy" && value !== "publishedAt") {
        return {
          ...newFilters,
          source: "",
        };
      }
      return newFilters;
    });
  };

  const isSourcesDisabled =
    selectedFilters.category !== "general" ||
    selectedFilters.sortBy !== "publishedAt";

  const isCategoryFiltersDisabled = selectedFilters.source !== "";

  const isDateFiltersDisabled = false;

  const handleApply = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setSelectedFilters(filters);
  }, [isOpen, filters]);

  const handleReset = () => {
    const resetFilters = {
      category: "general",
      source: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "publishedAt",
    };
    setSelectedFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const formatSourceName = (source) => {
    return source
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!isOpen) return null;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350 }} role="presentation">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6">Filter News</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedFilters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              disabled={isCategoryFiltersDisabled}
              label="Category"
            >
              {availableCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {isCategoryFiltersDisabled && (
              <FormHelperText>Disabled when source is selected</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Source</InputLabel>
            <Select
              value={selectedFilters.source}
              onChange={(e) => handleChange("source", e.target.value)}
              disabled={isSourcesDisabled}
              label="Source"
            >
              <MenuItem value="">All Sources</MenuItem>
              {availableSources.map((source) => (
                <MenuItem key={source} value={source}>
                  {formatSourceName(source)}
                </MenuItem>
              ))}
            </Select>
            {isSourcesDisabled && (
              <FormHelperText>
                Disabled when other filters are applied
              </FormHelperText>
            )}
          </FormControl>

          {/* <FormControl fullWidth margin="normal">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={selectedFilters.sortBy}
              onChange={(e) => handleChange("sortBy", e.target.value)}
              disabled={isCategoryFiltersDisabled}
              label="Sort By"
            >
              <MenuItem value="publishedAt">Latest</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="relevancy">Relevancy</MenuItem>
            </Select>
            {isCategoryFiltersDisabled && (
              <FormHelperText>Disabled when source is selected</FormHelperText>
            )}
          </FormControl> */}

          <TextField
            fullWidth
            margin="normal"
            label="Date From"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedFilters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
            disabled={isDateFiltersDisabled}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Date To"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedFilters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
            disabled={isDateFiltersDisabled}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" onClick={handleReset} color="primary">
              Reset
            </Button>
            <Button variant="contained" onClick={handleApply} color="primary">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
