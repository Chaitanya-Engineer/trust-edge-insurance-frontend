import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import {
  Calendar as CalendarIcon,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Popover } from "@mui/material";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomDateRangePicker = ({
  startDate,
  endDate,
  value,
  onChange,
  label,
  placeholder = "Select Date Range",
  format = "YYYY-MM-DD",
  displayFormat = "DD/MM/YYYY",
  disabled = false,
  error = false,
  errorMessage = "",
  minDate,
  maxDate,
  width = "w-full",
  className = "",
}) => {
  const initStart = value?.[0] || startDate;
  const initEnd = value?.[1] || endDate;

  const [startVal, setStartVal] = useState(
    initStart && dayjs(initStart).isValid() ? dayjs(initStart) : null
  );
  const [endVal, setEndVal] = useState(
    initEnd && dayjs(initEnd).isValid() ? dayjs(initEnd) : null
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(() => startVal || dayjs());
  const [viewMode, setViewMode] = useState("days"); // 'days' | 'yearMonth'
  const [selectedYear, setSelectedYear] = useState(() => (startVal || dayjs()).year());
  const [hoverDate, setHoverDate] = useState(null);

  // Sync external prop changes
  useEffect(() => {
    const s = value?.[0] || startDate;
    const e = value?.[1] || endDate;
    const parsedStart = s && dayjs(s).isValid() ? dayjs(s) : null;
    const parsedEnd = e && dayjs(e).isValid() ? dayjs(e) : null;
    setStartVal(parsedStart);
    setEndVal(parsedEnd);
    if (parsedStart) {
      setCurrentMonth(parsedStart);
      setSelectedYear(parsedStart.year());
    }
  }, [startDate, endDate, value]);

  const handleOpen = (e) => {
    if (!disabled) {
      setAnchorEl(e.currentTarget);
      setCurrentMonth(startVal || dayjs());
      setSelectedYear((startVal || dayjs()).year());
      setViewMode("days");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoverDate(null);
    setViewMode("days");
  };

  const isOpen = Boolean(anchorEl);

  const emitChange = (newStart, newEnd) => {
    const formattedStart = newStart && newStart.isValid() ? newStart.format(format) : "";
    const formattedEnd = newEnd && newEnd.isValid() ? newEnd.format(format) : "";

    onChange?.({
      startDate: formattedStart,
      endDate: formattedEnd,
      startDayjs: newStart,
      endDayjs: newEnd,
      value: [formattedStart, formattedEnd],
    });
  };

  const handleDayClick = (day) => {
    if (!startVal || (startVal && endVal)) {
      // 1st click: set start, reset end
      setStartVal(day);
      setEndVal(null);
      emitChange(day, null);
    } else if (startVal && !endVal) {
      // 2nd click: determine start & end
      if (day.isBefore(startVal, "day")) {
        setStartVal(day);
        setEndVal(null);
        emitChange(day, null);
      } else {
        setEndVal(day);
        emitChange(startVal, day);
        handleClose();
      }
    }
  };

  const handleClear = (e) => {
    e?.stopPropagation();
    setStartVal(null);
    setEndVal(null);
    setHoverDate(null);
    emitChange(null, null);
  };

  const handlePrevMonth = (e) => {
    e?.stopPropagation();
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = (e) => {
    e?.stopPropagation();
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  const handleSelectMonth = (monthIndex) => {
    const newMonth = dayjs().year(selectedYear).month(monthIndex).date(1);
    setCurrentMonth(newMonth);
    setViewMode("days");
  };

  const minDayjs = minDate && dayjs(minDate).isValid() ? dayjs(minDate) : null;
  const maxDayjs = maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate) : null;

  const hasSelection = Boolean(startVal || endVal);

  // Generate 42 calendar grid cells (6 rows x 7 days)
  const generateCalendarDays = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDayOfWeek = startOfMonth.day(); // 0 = Sunday
    const daysInMonth = currentMonth.daysInMonth();

    const days = [];

    // Prev month padding days
    const prevMonth = currentMonth.subtract(1, "month");
    const prevMonthDaysCount = prevMonth.daysInMonth();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.date(prevMonthDaysCount - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: currentMonth.date(i),
        isCurrentMonth: true,
      });
    }

    // Next month padding days to complete full grid
    const remainingDays = 42 - days.length;
    const nextMonth = currentMonth.add(1, "month");
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: nextMonth.date(i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getDisplayText = () => {
    if (startVal && endVal) {
      return (
        <span className="flex items-center gap-1.5 text-[#17212B] font-semibold text-[12px] truncate">
          <span>{startVal.format(displayFormat)}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{endVal.format(displayFormat)}</span>
        </span>
      );
    }
    if (startVal) {
      return (
        <span className="text-[#17212B] font-medium text-[12px] truncate">
          {startVal.format(displayFormat)} – End
        </span>
      );
    }
    return <span className="text-slate-400 font-normal text-[12px] truncate">{placeholder}</span>;
  };

  return (
    <div className={`relative flex flex-col gap-0.5 ${width} ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-[#0B2545]">
          {label}
        </label>
      )}

      {/* Trigger Box - Matched with Action Buttons */}
      <div
        onClick={handleOpen}
        className={`group flex items-center justify-between h-[38px] px-3 bg-white rounded-[8px] border transition-all cursor-pointer select-none ${
          disabled
            ? "bg-slate-100 border-slate-200 cursor-not-allowed opacity-70"
            : error
            ? "border-red-400 ring-1 ring-red-100"
            : isOpen
            ? "border-[#0B2545] ring-2 ring-[#0B2545]/10 shadow-xs"
            : "border-[#D0DCEB] hover:border-[#0B2545] shadow-xs"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <CalendarIcon className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
          <div className="truncate flex-1">{getDisplayText()}</div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {hasSelection && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
              title="Clear date range"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#0B2545]" : ""
            }`}
          />
        </div>
      </div>

      {error && errorMessage && (
        <span className="text-[11px] text-red-600 font-medium ml-1">
          {errorMessage}
        </span>
      )}

      {/* Neat Single Calendar Popover */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: "10px",
              boxShadow: "0px 10px 25px rgba(11, 37, 69, 0.12)",
              border: "1px solid #E5E9E7",
              p: "10px",
              width: "252px",
              backgroundColor: "#FFFFFF",
            },
          },
        }}
      >
        <div className="flex flex-col select-none">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[#F0F3F2]">
            {viewMode === "days" ? (
              <>
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-[#0B2545] hover:bg-[#EAF0F6] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Clickable Month & Year Header */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear(currentMonth.year());
                    setViewMode("yearMonth");
                  }}
                  className="px-1.5 py-0.5 rounded-md text-[11px] font-bold text-[#0B2545] hover:bg-[#EAF0F6] transition-colors border-none bg-transparent cursor-pointer flex items-center gap-1"
                  title="Click to change Year / Month"
                >
                  <span>{currentMonth.format("MMMM YYYY")}</span>
                  <ChevronDown className="w-2.5 h-2.5 text-[#0B2545]/70" />
                </button>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-[#0B2545] hover:bg-[#EAF0F6] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              /* Year Navigation in Year/Month Mode */
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={() => setSelectedYear((y) => y - 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-[#0B2545] hover:bg-[#EAF0F6] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-bold text-[#0B2545]">
                  {selectedYear}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedYear((y) => y + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-[#0B2545] hover:bg-[#EAF0F6] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* View Mode 1: Month/Year Expand Grid */}
          {viewMode === "yearMonth" ? (
            <div className="flex flex-col gap-1.5 py-1">
              <div className="text-[10px] font-semibold text-slate-500 text-center">
                Select Month
              </div>
              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((mName, idx) => {
                  const isCurrent =
                    currentMonth.month() === idx &&
                    currentMonth.year() === selectedYear;
                  return (
                    <button
                      key={mName}
                      type="button"
                      onClick={() => handleSelectMonth(idx)}
                      className={`py-1.5 text-[11px] font-semibold rounded-md transition-all border-none cursor-pointer ${
                        isCurrent
                          ? "bg-[#0B2545] text-white shadow-xs"
                          : "bg-slate-50 text-[#17212B] hover:bg-[#EAF0F6] hover:text-[#0B2545]"
                      }`}
                    >
                      {mName}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setViewMode("days")}
                className="mt-0.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-[#0B2545] border-none bg-transparent cursor-pointer"
              >
                Back to Calendar
              </button>
            </div>
          ) : (
            /* View Mode 2: Days Grid */
            <div className="flex flex-col">
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-0 mb-0.5 text-center">
                {WEEKDAYS.map((wd) => (
                  <span
                    key={wd}
                    className="text-[9.5px] font-bold text-[#667085] py-0.5"
                  >
                    {wd}
                  </span>
                ))}
              </div>

              {/* Days Matrix */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {calendarDays.map(({ date, isCurrentMonth }, index) => {
                  const isStart = startVal && date.isSame(startVal, "day");
                  const isEnd = endVal && date.isSame(endVal, "day");

                  const effectiveEnd =
                    endVal ||
                    (hoverDate && startVal && hoverDate.isAfter(startVal, "day")
                      ? hoverDate
                      : null);

                  const isInRange =
                    startVal &&
                    effectiveEnd &&
                    date.isAfter(startVal, "day") &&
                    date.isBefore(effectiveEnd, "day");

                  const isDisabled =
                    (minDayjs && date.isBefore(minDayjs, "day")) ||
                    (maxDayjs && date.isAfter(maxDayjs, "day"));

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => {
                        if (startVal && !endVal) setHoverDate(date);
                      }}
                      className={`relative flex items-center justify-center h-7 p-0 ${
                        isInRange ? "bg-[#EAF0F6]" : ""
                      } ${
                        isStart && effectiveEnd
                          ? "rounded-l-full bg-[#EAF0F6]"
                          : ""
                      } ${
                        isEnd ? "rounded-r-full bg-[#EAF0F6]" : ""
                      }`}
                    >
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleDayClick(date)}
                        className={`w-6 h-6 text-[11px] flex items-center justify-center rounded-full transition-all border-none cursor-pointer ${
                          isDisabled
                            ? "text-slate-300 cursor-not-allowed bg-transparent"
                            : isStart || isEnd
                            ? "bg-[#0B2545] text-white font-bold shadow-xs"
                            : isCurrentMonth
                            ? "text-[#17212B] hover:bg-[#EAF0F6]"
                            : "text-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {date.date()}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer text helper */}
              <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-[#F0F3F2] text-[10px] text-slate-500">
                <span>
                  {!startVal
                    ? "Select Start Date"
                    : !endVal
                    ? "Select End Date"
                    : "Range Selected"}
                </span>
                {hasSelection && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[10px] font-semibold text-slate-500 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer p-0"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default CustomDateRangePicker;
