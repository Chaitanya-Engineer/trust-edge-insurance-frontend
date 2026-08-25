import React from "react";
import {
  Pagination as MuiPagination,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

const TablePagination = ({
  page = 1,
  pageSize = 5,
  totalCount = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, { value: -1, label: "All" }],
  className = "",
}) => {
  const isAll = pageSize === -1 || pageSize >= (totalCount || 1);
  const effectivePageSize = isAll ? (totalCount || 1) : pageSize;

  const totalPages = isAll ? 1 : Math.ceil(totalCount / effectivePageSize) || 1;
  const startItem = totalCount === 0 ? 0 : isAll ? 1 : (page - 1) * effectivePageSize + 1;
  const endItem = isAll ? totalCount : Math.min(page * effectivePageSize, totalCount);

  const handlePageChange = (event, newPage) => {
    onPageChange?.(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const val = Number(event.target.value);
    onPageSizeChange?.(val);
  };

  // Normalize pageSizeOptions (can be numbers or objects like { value: -1, label: 'All' })
  const normalizedOptions = pageSizeOptions.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return { value: opt.value, label: opt.label || String(opt.value) };
    }
    return { value: Number(opt), label: String(opt) };
  });

  return (
    <Box
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E9E7] bg-white px-4 py-2.5 text-sm text-[#17212B] ${className}`}
    >
      {/* Left: Showing count & Rows per page selector */}
      <Box className="flex flex-wrap items-center gap-4">
        <Typography variant="body2" sx={{ fontSize: "0.8125rem", color: "#667085" }}>
          Showing <strong style={{ color: "#17212B" }}>{startItem}</strong> to{" "}
          <strong style={{ color: "#17212B" }}>{endItem}</strong> of{" "}
          <strong style={{ color: "#17212B" }}>{totalCount}</strong> entries
        </Typography>

        {onPageSizeChange && (
          <Box className="flex items-center gap-2">
            <Typography variant="body2" sx={{ fontSize: "0.8125rem", color: "#667085" }}>
              Rows per page:
            </Typography>
            <Select
              value={pageSize}
              onChange={handleRowsPerPageChange}
              size="small"
              sx={{
                height: "32px",
                fontSize: "0.8125rem",
                borderRadius: "6px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9E0DD",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0B2545",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0B2545",
                },
              }}
            >
              {normalizedOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontSize: "0.8125rem" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>

      {/* Right: MUI Pagination component */}
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        size="small"
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "0.8125rem",
            fontWeight: "600",
            borderRadius: "6px",
            color: "#344054",
            "&:hover": {
              backgroundColor: "#EAF0F6",
            },
            "&.Mui-selected": {
              backgroundColor: "#0B2545 !important",
              color: "#FFFFFF !important",
              "&:hover": {
                backgroundColor: "#0E2F52 !important",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default TablePagination;
