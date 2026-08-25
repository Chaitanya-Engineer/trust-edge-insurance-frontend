import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const CustomDateTimePicker = ({
  dateValue = "",
  timeValue = "",
  onChange,
  label,
  error = false,
  errorMessage = "",
  width = "w-full",
  disabled = false,
  disableFuture = false,
  maxDate = null,
}) => {
  const [open, setOpen] = useState(false);

  // Construct initial dayjs value from dateValue + timeValue
  let dayjsVal = null;
  if (dateValue) {
    const combinedStr = timeValue ? `${dateValue} ${timeValue}` : dateValue;
    const parsed = dayjs(combinedStr);
    if (parsed.isValid()) {
      dayjsVal = parsed;
    }
  }

  const handleChange = (newValue) => {
    if (!newValue || !newValue.isValid()) {
      onChange?.({ date: "", time: "", dayjsObj: null });
      return;
    }

    const formattedDate = newValue.format("YYYY-MM-DD");
    const formattedTime = newValue.format("HH:mm");
    onChange?.({
      date: formattedDate,
      time: formattedTime,
      dayjsObj: newValue,
    });
  };

  return (
    <div className={`${width}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...(label ? { label } : {})}
          value={dayjsVal}
          onChange={handleChange}
          disabled={disabled}
          disableFuture={disableFuture}
          maxDate={maxDate}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slotProps={{
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  borderRadius: "14px",
                  boxShadow: "0px 12px 32px rgba(11, 37, 69, 0.14)",
                  border: "1px solid #E5E9E7",
                  padding: "4px",
                },
                "& .MuiPickersDay-root": {
                  borderRadius: "8px",
                  fontSize: "0.8125rem",
                  "&.Mui-selected": {
                    backgroundColor: "#0B2545 !important",
                    color: "#FFFFFF",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#0E2F52 !important",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#EAF0F6",
                  },
                  "&.MuiPickersDay-today": {
                    borderColor: "#0B2545",
                  },
                },
                "& .MuiPickersCalendarHeader-label": {
                  color: "#0B2545",
                  fontWeight: "600",
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  color: "#667085",
                  fontWeight: "600",
                },
              },
            },
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: errorMessage || "",
              onClick: () => {
                if (!disabled) {
                  setOpen(true);
                }
              },
              inputProps: {
                readOnly: true,
                style: { cursor: disabled ? "not-allowed" : "pointer" },
              },
              sx: {
                cursor: disabled ? "not-allowed" : "pointer",
                "& .MuiOutlinedInput-root": {
                  height: "2.75rem",
                  cursor: disabled ? "not-allowed" : "pointer",
                  borderRadius: "0.5rem",
                  backgroundColor: disabled ? "#F4F7F6" : "#FFFFFF",
                  fontSize: "0.875rem",
                  color: "#17212B",
                  "& fieldset": {
                    borderRadius: "0.5rem !important",
                    borderColor: error ? "#B42318" : "#D9E0DD",
                  },
                  "&:hover fieldset": {
                    borderColor: error ? "#B42318" : "#0B2545",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: error ? "#B42318" : "#0B2545",
                    borderWidth: "1px",
                    boxShadow: error
                      ? "0 0 0 3px rgba(180, 35, 24, 0.10)"
                      : "0 0 0 3px rgba(11, 37, 69, 0.10)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem",
                  color: "#344054",
                  "&.Mui-focused": {
                    color: "#0B2545",
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDateTimePicker;
