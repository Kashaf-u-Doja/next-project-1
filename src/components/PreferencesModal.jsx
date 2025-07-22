"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  FormHelperText,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function PreferencesModal({
  preferences,
  onSave,
  onClose,
  availableCategories,
  availableSources,
}) {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const hasPreferences =
    localPreferences.sources.length > 0 ||
    localPreferences.categories.length > 0;

  const handleCheckboxChange = (type, value) => {
    setLocalPreferences((prev) => {
      if (type === "categories") {
        return { ...prev, categories: [value] };
      }
      if (type === "sources") {
        const newValues = prev[type].includes(value)
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value];
        return {
          ...prev,
          [type]: newValues,
          categories: newValues.length > 0 ? [] : prev.categories,
        };
      }
      const newValues = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  const handleCategoryRadioChange = (value) => {
    setLocalPreferences((prev) => ({
      ...prev,
      categories: value ? [value] : [],
      sources: value ? [] : prev.sources,
    }));
  };

  const handleSave = () => {
    onSave(localPreferences);
  };

  const handleClearPreferences = () => {
    const clearedPreferences = {
      sources: [],
      categories: [],
      authors: [],
    };
    setLocalPreferences(clearedPreferences);
    onSave(clearedPreferences);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Customize Preferences</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {hasPreferences && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearPreferences}
              size="small"
            >
              Clear All Preferences
            </Button>
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Categories (Select one)
          </Typography>
          <RadioGroup
            value={localPreferences.categories[0] || ""}
            onChange={(e) => handleCategoryRadioChange(e.target.value)}
          >
            <FormControlLabel
              value=""
              control={<Radio />}
              label="No preference (use filters)"
            />
            {availableCategories.map((category) => (
              <FormControlLabel
                key={category}
                value={category}
                control={
                  <Radio disabled={localPreferences.sources.length > 0} />
                }
                label={category.charAt(0).toUpperCase() + category.slice(1)}
              />
            ))}
          </RadioGroup>
          {localPreferences.sources.length > 0 && (
            <FormHelperText>
              Categories disabled when sources are selected
            </FormHelperText>
          )}
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Sources
          </Typography>
          <FormGroup>
            {availableSources.map((source) => (
              <FormControlLabel
                key={source}
                control={
                  <Checkbox
                    checked={localPreferences.sources.includes(source)}
                    onChange={() => handleCheckboxChange("sources", source)}
                  />
                }
                label={source.charAt(0).toUpperCase() + source.slice(1)}
              />
            ))}
          </FormGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}
