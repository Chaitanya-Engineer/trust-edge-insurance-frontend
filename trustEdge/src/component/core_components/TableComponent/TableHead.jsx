import { ArrowDown } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import {
  Checkbox,
  TableHead as Head,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import FilterComponent from "../FilterComponent/FilterComponent";
import { tableComponentConstants, tableHeadConstants } from "./Constant";

const ARROW_SIZE = 60;

const TableHead = forwardRef(
  (
    {
      theme,
      dataSource: propDataSource,
      filterDataSource,
      handleSelectAllClick,
      headers,
      isCheckbox,
      isHash,
      isSelection,
      numSelected: propNumSelected,
      rowCount: propRowCount,
      headColor,
      handleSort,
      orderBy,
      order,
      clickable = false,
      collapsible = false,
    },
    ref
  ) => {
    const {
      CHECKBOX: { PADDING },
      SRNO,
    } = tableHeadConstants;

    const displayWidth = useMemo(() => window.innerWidth, [window.innerWidth]);
    const dataSource = useMemo(() => propDataSource, [propDataSource]);
    const numSelected = useMemo(() => propNumSelected, [propNumSelected]);
    const rowCount = useMemo(() => propRowCount, [propRowCount]);
    const filterRefs = useRef({});

    useImperativeHandle(ref, () => ({ resetFilter, resetSpecificFilters }), [
      filterRefs,
    ]);

    function resetFilter(preserveAccessors = []) {
      Object.entries(filterRefs.current).forEach(([accessor, instance]) => {
        if (preserveAccessors.includes(accessor)) return;
        instance?.setQuery("");
        instance?.setSelected([]);
      });
    }

    function resetSpecificFilters(accessors = []) {
      accessors.forEach((accessor) => {
        const instance = filterRefs.current[accessor];
        instance?.setQuery("");
        instance?.setSelected([]);
      });
    }
    const customHeadColor =
      typeof headColor === typeof {} ? headColor[theme] : headColor;
    const customTextColor =
      tableComponentConstants?.HEAD_TXT_THEME_COLOR[theme] ?? "#0E4B35";

    return (
      <tr style={{ backgroundColor: `${customHeadColor} !important` }}>
          {isSelection && (
            <TableCell
              className="pr-0"
              sx={{
                backgroundColor: `${customHeadColor} !important`,
                width: "40px !important",
              }}
              padding={PADDING}
            >
              {isCheckbox && (
                <Checkbox
                  size={
                    (displayWidth <= 1920 && "small") ||
                    (displayWidth > 1920 && displayWidth <= 2560 && "medium") ||
                    (displayWidth > 2560 && "large") ||
                    "small"
                  }
                  className="!text-checkbox-bg"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                />
              )}
            </TableCell>
          )}

          {collapsible && (
            <TableCell
              sx={{
                backgroundColor: `${customHeadColor} !important`,
                width: "60px !important",
                minWidth: "60px !important",
                p: "14px 8px !important",
                textAlign: "center",
                color: `${customTextColor} !important`,
              }}
              className="!py-3.5 !font-['Lexend'] !text-[11px] !font-bold !uppercase !tracking-wider"
            >
              Expand
            </TableCell>
          )}

          {headers?.map((headCell, index) => {
            return (
              <TableCell
                key={headCell.accessor + index}
                className="!py-3.5 !font-['Lexend'] !text-[11px] !font-bold !uppercase !tracking-wider"
                sx={{
                  backgroundColor: `${customHeadColor} !important`,
                  textAlign: headCell?.text_align,
                  color: `${customTextColor} !important`,
                  width:
                    window.innerWidth > 2200
                      ? headCell?.width
                        ? Number(headCell?.width) + 50
                        : undefined
                      : headCell?.width,
                  minWidth: headCell?.width,
                }}
              >
                <div
                  className={clsx(
                    {
                      "justify-center": headCell?.header_align === "center",
                    },
                    "flex items-center gap-2"
                  )}
                >
                  <span className="text-nowrap font-semibold" style={{ color: customTextColor }}>
                    {headCell?.specialTitle
                      ? headCell?.specialTitle()
                      : headCell?.title}
                  </span>

                  {headCell?.is_filter && (
                    <FilterComponent
                      ref={(el) => {
                        filterRefs.current[headCell?.accessor] = el;
                      }}
                      list={dataSource}
                      column={headCell}
                      filterEvent={filterDataSource}
                    />
                  )}

                  {("is_sortable" in headCell
                    ? headCell?.is_sortable
                    : true) && (
                      <div onClick={() => handleSort(headCell)}>
                        <TableSortLabel
                          sx={{
                            "& .MuiTableSortLabel-icon": {
                              color:
                                orderBy === headCell.accessor
                                  ? `${customTextColor} !important`
                                  : "rgba(255, 255, 255, 0.75) !important",
                            },
                          }}
                          IconComponent={
                            orderBy === headCell.accessor
                              ? ArrowDown
                              : ArrowUpDown
                          }
                          active={true}
                          direction={
                            orderBy === headCell.accessor ? order : "asc"
                          }
                        />
                      </div>
                    )}
                </div>
              </TableCell>
            );
          })}

          {clickable && (
            <TableCell
              className="!py-3 !font-sans !text-sm !font-medium lg:!text-lg 2k:!text-[1.75rem] 4k:!py-6 4k:!text-[2.50rem]"
              sx={{
                backgroundColor: `${customHeadColor} !important`,
                textAlign: "center",
                color:
                  tableComponentConstants?.HEAD_TXT_THEME_COLOR[theme] ??
                  "#676792",
                width:
                  window.innerWidth > 2200
                    ? Number(ARROW_SIZE) + 50
                    : ARROW_SIZE,
              }}
            >
              <div className="flex items-center justify-center gap-2" />
            </TableCell>
          )}
        </tr>
    );
  }
);

export default TableHead;
