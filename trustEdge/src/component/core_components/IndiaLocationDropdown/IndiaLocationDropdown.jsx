import React, { useMemo } from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";
import indiaStatesData from "./data/india_states.json";
import indiaCitiesData from "./data/india_cities.json";


const getAutocompleteTextFieldSx = (error) => ({
  "& .MuiOutlinedInput-root": {
    height: 44,
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    color: "#344054",
    padding: "0 8px !important",
    "& fieldset": {
      borderColor: error ? "#B42318" : "#D9E0DD",
    },
    "&:hover fieldset": {
      borderColor: error ? "#B42318" : "#B0BAB5",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "#B42318" : "#0B2545",
      borderWidth: "1.5px",
    },
    "&.Mui-disabled": {
      backgroundColor: "#F9FAFB",
      color: "#98A2B3",
      "& fieldset": {
        borderColor: "#EAECF0",
      },
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    padding: "8px 4px !important",
    "&::placeholder": {
      color: "#98A2B3",
      opacity: 1,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginTop: "4px",
    fontSize: "12px",
    color: error ? "#B42318" : "#475467",
  },
});


const IndiaLocationDropdown = ({
  state = "",
  city = "",
  onStateChange,
  onCityChange,
  stateError = false,
  stateHelperText = "",
  cityError = false,
  cityHelperText = "",
  disabled = false,
  required = true,
  stateContainerClassName = "w-full",
  cityContainerClassName = "w-full",
}) => {
  // Extract and sort state names
  const stateOptions = useMemo(() => {
    if (!Array.isArray(indiaStatesData)) return [];
    return indiaStatesData.map((s) => s.name).sort();
  }, []);

  // Extract city options based on currently selected state
  const cityOptions = useMemo(() => {
    if (!state || !indiaCitiesData[state]) return [];
    const stateData = indiaCitiesData[state];
    if (Array.isArray(stateData.cities)) {
      return stateData.cities.map((c) => c.name).sort();
    }
    return [];
  }, [state]);

  const handleStateChange = (event, newValue) => {
    const selectedState = newValue || "";
    if (onStateChange) {
      onStateChange(selectedState);
    }
    // Dependent reset: clear city when state changes
    if (onCityChange && city) {
      onCityChange("");
    }
  };

  const handleCityChange = (event, newValue) => {
    // When freeSolo is active, newValue can be a string or null (on clear)
    const selectedCity = typeof newValue === "string" ? newValue.trim() : "";
    if (onCityChange) {
      onCityChange(selectedCity);
    }
  };

  const handleCityInputChange = (event, newInputValue, reason) => {
    // Handles manual typing (reason === "input") or clear (reason === "clear")
    if (reason === "input" && onCityChange) {
      onCityChange(newInputValue);
    } else if (reason === "clear" && onCityChange) {
      onCityChange("");
    }
  };

  return (
    <>
      {/* State Field */}
      <div className={stateContainerClassName}>
        <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
          State {required && <span className="text-[#B42318] ml-0.5">*</span>}
        </label>

        <Autocomplete
          options={stateOptions}
          value={state || null}
          onChange={handleStateChange}
          disabled={disabled}
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select State"
              error={Boolean(stateError)}
              helperText={stateHelperText}
              sx={getAutocompleteTextFieldSx(Boolean(stateError))}
            />
          )}
        />
      </div>

      {/* City Field (with freeSolo for manual entry) */}
      <div className={cityContainerClassName}>
        <label className="mb-1.5 block text-[13px] font-semibold text-[#344054]">
          City {required && <span className="text-[#B42318] ml-0.5">*</span>}
        </label>

        <Autocomplete
          freeSolo
          options={cityOptions}
          value={city || ""}
          onChange={handleCityChange}
          onInputChange={handleCityInputChange}
          disabled={disabled || !state}
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={!state ? "Select State first" : "Search or type city"}
              error={Boolean(cityError)}
              helperText={cityHelperText}
              sx={getAutocompleteTextFieldSx(Boolean(cityError))}
            />
          )}
        />
      </div>
    </>
  );
};

export default IndiaLocationDropdown;
