import { useState } from "react";

import { Checkbox, Radio, TableCell, Tooltip, IconButton } from "@mui/material";

import {
  tableComponentConstants,
  tableDataTypes,
  tableRowConstants,
} from "./Constant";
import clsx from "clsx";

import { memo, useMemo } from "react";
import { Info, ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";

import {
  convertArrayToString,
  formatDate,
} from "../../../lib/constant/helperFunctions";
import { CopyIcon } from "../../../assets/icons/CopyIcon";
import { showToast } from "../CustomToast/CustomToast";

const TableRow = memo(
  ({
    theme,
    row,
    index,
    headers,
    isSelected,
    radioChecked,
    isSelection,
    isCheckbox,
    isHash,
    isRadio,
    onChecked,
    clickable = false,
    specialCellStyleFunction,
    onCellClick = null,
    collapsible = false,
    isExpanded = false,
    onToggleExpand = null,
  }) => {
    const { YES, NO } = tableComponentConstants;

    const { ARRAY, BOOLEAN, DATE, NUMBER, STRING, SPECIAL, CLICK } =
      tableDataTypes;

    const { LABLED_BY, LABLE_ID, TEXT_ELLIPSIS, COPIED } = tableRowConstants;

    const [isCellHover, setIsCellHover] = useState({
      cell: null,
      hover: false,
    });

    const displayWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

    const isItemSelected = isSelected(row);
    const labelId = `${LABLE_ID}${index}`;

    const rowBgColor =
      index % 2 === 0
        ? tableComponentConstants?.ROW_ALTERNATE_COLORS?.[theme]?.[0] ??
        "var(--calender-bg)"
        : tableComponentConstants?.ROW_ALTERNATE_COLORS?.[theme]?.[1] ??
        "var(--calender-bg)";

    const Hyphen = ({ position = "center" }) => {
      const style = {
        start: "w-full text-start",
        center: "w-full text-center",
        end: "w-full text-end",
      };

      return <div className={style[position]}>-</div>;
    };

    function getColumnData(column, data) {
      const { accessor, type, isCopy } = column;

      const cell = data[accessor];
      switch (type) {
        case ARRAY:
          return cell ? (
            convertArrayToString(cell)
          ) : (
            <Hyphen position={column?.null_align ?? "center"} />
          );
        case DATE:
          return cell ? (
            formatDate(cell, "yyyy-MM-DD h:mm:ss a")
          ) : (
            <Hyphen position={column?.null_align ?? "center"} />
          );
        case STRING:
          return cell ? (
            cell?.length !== 0 ? (
              isCopy &&
                ((isCellHover.hover && isCellHover.cell === accessor) ||
                  displayWidth < 768) ? (
                <div
                  className={clsx(`flex items-center`, {
                    "gap-1": displayWidth > 768,
                    "justify-between": displayWidth < 768,
                  })}
                >
                  {cell}
                  <CopyIcon
                    fill="var(--title-txt)"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard
                        .writeText(cell)
                        .then(() => {
                          showToast.success("Copied to Clipboard!", `${column?.title || "Text"}: ${cell}`);
                        });
                    }}
                  />
                </div>
              ) : (
                cell
              )
            ) : (
              <Hyphen position={column?.null_align ?? "left"} />
            )
          ) : (
            <Hyphen position={column?.null_align ?? "left"} />
          );
        case BOOLEAN:
          return cell !== null ? (
            cell ? (
              YES
            ) : (
              NO
            )
          ) : (
            <Hyphen position={column?.null_align ?? "center"} />
          );
        case NUMBER:
          return cell === null || cell === undefined ? <Hyphen /> : cell;
        case SPECIAL:
          return (
            column.specialCellRowFunction(data) ?? (
              <Hyphen position={column?.null_align ?? "center"} />
            )
          );

        case CLICK:
          return (
            <div
              onClick={() => {
                column.specialClickContainer(data);
              }}
            >
              <Info />
            </div>
          );
        default:
          return null;
      }
    }

    return (
      <>
        {isSelection && (
          <TableCell
            style={{
              backgroundColor: "transparent",
            }}
            className="pr-0"
            padding="checkbox"
          >
            {isRadio && (
              <Radio
                checked={radioChecked?.id === row.id}
                size={(displayWidth <= 1920 && "small") || "medium"}
                className="!text-primary-normal"
              />
            )}
            {isCheckbox && (
              <Checkbox
                size={
                  (displayWidth <= 1920 && "small") ||
                  (displayWidth > 1920 && displayWidth <= 2560 && "medium") ||
                  (displayWidth > 2560 && "large") ||
                  "small"
                }
                className="!text-checkbox-border"
                onChange={() => onChecked(row)}
                onClick={(e) => {
                  e?.stopPropagation();
                }}
                checked={isItemSelected}
                inputProps={{
                  [LABLED_BY]: labelId,
                }}
              />
            )}
          </TableCell>
        )}

        {isHash && (
          <TableCell
            style={{
              backgroundColor: "transparent",
              color:
                tableComponentConstants?.ROW_TXT_THEME_COLOR[theme] ??
                tableComponentConstants?.ROW_TXT_COLOR ??
                "#707070",
            }}
            className={clsx("!pr-0 !text-base 2k:!text-2xl 4k:!text-4xl", {
              "pl-5": !isSelection,
            })}
          >
            {index + 1}
          </TableCell>
        )}

        {collapsible && (
          <TableCell
            sx={{ width: 60, minWidth: 60, p: "12px 8px !important", textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onToggleExpand && onToggleExpand();
              }}
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#EAF0F6] hover:bg-[#0B2545] text-[#0B2545] hover:text-white transition-all cursor-pointer border border-[#E5E9E7] shadow-xs"
              title={isExpanded ? "Collapse Policy Details" : "Expand Policy Details"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </TableCell>
        )}

        {headers?.map((key) => {
          const {
            accessor,
            width,
            toolTip,
            text_align,
            text_wrap = false,
          } = key;

          return (
            <Tooltip title={toolTip && getColumnData(key, row)} key={accessor}>
              <TableCell
                style={{
                  backgroundColor: rowBgColor || "transparent",
                  color:
                    tableComponentConstants?.ROW_TXT_THEME_COLOR[theme] ??
                    "#707070",
                }}
                onMouseEnter={() =>
                  setIsCellHover({ cell: accessor, hover: true })
                }
                onMouseLeave={() =>
                  setIsCellHover({ cell: null, hover: false })
                }
                key={accessor}
                onClick={() => {
                  onCellClick({
                    headerKey: key,
                    data: row,
                  });
                }}
                className={clsx(
                  "!select-none !py-4 !font-['Lexend'] !text-[13px] !font-medium text-[#344054] 2k:!py-3.5 2k:!text-xl 4k:!py-6 4k:!text-3xl",
                  {
                    "cursor-pointer": clickable,
                    "text-nowrap": !text_wrap,
                    "text-wrap": text_wrap,
                  }
                )}
                sx={{
                  ...specialCellStyleFunction(row, accessor),
                  ...(width && !text_wrap ? TEXT_ELLIPSIS(width) : {}),
                  textAlign: text_align,
                }}
              >
                {getColumnData(key, row)}
              </TableCell>
            </Tooltip>
          );
        })}
        {clickable && (
          <TableCell
            style={{
              backgroundColor: rowBgColor || "transparent",
              color:
                tableComponentConstants?.ROW_TXT_THEME_COLOR[theme] ??
                "#707070",
            }}
            key={"click_arrow"}
            className={clsx(
              "!select-none text-nowrap !py-3.5 !font-['Lexend'] !text-[12px] lg:!text-base 2k:!py-3 2k:!text-2xl 4k:!py-5 4k:!text-4xl",
              {
                "cursor-pointer": clickable,
              }
            )}
            sx={{
              width: "60px !important",
              color:
                tableComponentConstants?.ROW_TXT_THEME_COLOR[theme] ??
                "#707070",
            }}
          >
            <ArrowUpRight />
          </TableCell>
        )}
      </>
    );
  }
);

export default TableRow;
