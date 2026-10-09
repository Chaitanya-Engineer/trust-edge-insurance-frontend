import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { List } from "react-virtualized";

import moment from "moment";

import { ListFilter, Search } from "lucide-react";

import { Checkbox, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import clsx from "clsx";
import {
  filterComponentConstants,
  filterComponentStyleConstants,
  tableComponentConstants,
  tableDataTypes,
} from "../TableComponent/Constant";
import { showToast } from "../CustomToast/CustomToast";

function FilterComponent(
  {
    column,
    filterEvent,
    list: propList,
    sizes = "opacity-80 hd:!size-7 2k:!size-9 4k:!size-11",
  },
  ref
) {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  useImperativeHandle(ref, () => ({ setQuery, setSelected }), [
    query,
    selected,
  ]);

  const numSelected = selected.length;
  const rowCount = list.length;

  const { NO, YES } = tableComponentConstants;

  const { ARRAY, BOOLEAN, DATE, NUMBER, SPECIAL, STRING } = tableDataTypes;

  const {
    CLEAR,
    SELECT_ALL,
    NULL,
    DATE_FORMAT,
    VARIENT,
    POPUP_ID,
    TOOLTIP_TITLE,
    INPUT_TYPES: { TEXT },
    FILER_MENU_ITEM,
  } = filterComponentConstants;

  const { ICON_BUTTON } = filterComponentStyleConstants;

  const filterList = useMemo(() => {
    if (!query) return list;

    if (column?.is_bulk_search) {
      return list.filter((item) =>
        String(item).toLowerCase().includes(query.toLowerCase().trim())
      );
    }

    const isTrailingComma = query.trim().endsWith(",");
    const values = query
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean);

    if (isTrailingComma) {
      return list;
    }
    return list.filter((item) =>
      values.some((val) => String(item).toLowerCase().includes(val))
    );
  }, [list, query, column?.is_bulk_search]);

  const displayWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

  const listStyle = useMemo(() => {
    if (window.innerWidth <= 1920)
      return { itemSize: 40, listHeight: 200, listWidth: 235 };
    else if (window.innerWidth > 1920 && window.innerWidth <= 2560)
      return { itemSize: 60, listHeight: 300, listWidth: 390 };
    else return { itemSize: 80, listHeight: 400, listWidth: 490 };
  }, [window.innerWidth]);

  function setFilterList(arr = [], column) {
    const { accessor, type } = column;
    const options = arr
      .flatMap((obj) => {
        const cell = obj[accessor];
        switch (type) {
          case ARRAY:
            return cell && cell;
          case DATE:
            return cell && moment(cell).format(DATE_FORMAT);
          case STRING:
            return cell && cell;
          case BOOLEAN:
            if (cell !== null) return cell ? YES : NO;
            return;
          case NUMBER:
            return cell && cell;
          case SPECIAL:
            return column?.filterFunction?.(obj);
          default:
            break;
        }
      })
      .filter((f) => f);

    const uniqueOptions = [...new Set(options)];
    return uniqueOptions.filter((o) => o !== "__NULL__");
  }

  function handleSelectAllClick({ target: { checked } }) {
    if (checked) {
      setSelected([...filterList]);
      return;
    }
    setSelected([]);
  }

  function handleClick(value) {
    const selectedIndex = selected.indexOf(value);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, value);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function clearFilter() {
    setSelected([]);
    setQuery("");
    filterEvent([], column);
    showToast.info("Filter Reset", `Cleared filters for ${column?.title || "column"}`);
    if (column?.is_filter_with_api) {
      column?.on_clear_filter(column);
    }
  }

  function isSelected(value) {
    return selected.indexOf(value) !== -1;
  }

  useEffect(() => setList(setFilterList(propList, column)), [propList]);
  return (
    <PopupState variant={VARIENT} popupId={POPUP_ID}>
      {(popupState) => (
        <>
          <Tooltip title={TOOLTIP_TITLE}>
            <IconButton
              className="!rounded-[5px] !p-0.5 transition-all"
              sx={{
                color: selected.length
                  ? "#2A843C !important"
                  : popupState.isOpen
                  ? "#2A843C !important"
                  : "rgba(255, 255, 255, 0.9) !important",
                backgroundColor: selected.length
                  ? "#FFFFFF !important"
                  : popupState.isOpen
                  ? "#FFFFFF !important"
                  : "transparent !important",
                "&:hover": {
                  color: "#FFFFFF !important",
                  backgroundColor: "rgba(255, 255, 255, 0.2) !important",
                },
              }}
              {...bindTrigger(popupState)}
            >
              <ListFilter className={sizes} />
            </IconButton>
          </Tooltip>
          <Menu
            disableAutoFocusItem
            autoFocus={false}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: "#ffffff !important",
                boxShadow: "0px 8px 24px rgba(0,0,0,0.08) !important",
                border: "1px solid #E5E9E7 !important",
                borderRadius: "8px !important",
                padding: "4px 0 !important",
              },
            }}
            {...bindMenu(popupState)}
          >
            {/* Search Input Box */}
            <div className="px-4 py-2">
              <div
                className={`relative flex items-center w-[215px] h-9 border rounded-[6px] bg-white transition-all duration-150 ${
                  searchFocused
                    ? "border-[#0F4C3A] ring-2 ring-[rgba(15,76,58,0.12)]"
                    : "border-[#DADCE0]"
                } 2k:h-12 2k:w-72 4k:h-14 4k:w-80`}
              >
                <Search className="absolute left-2.5 text-[#718096] w-4 h-4 4k:!size-8 flex-shrink-0" />
                <input
                  className="w-full h-full pl-8 pr-7 border-none !bg-transparent !text-[13px] !text-[#17212B] !text-left outline-none !placeholder-[#667085]"
                  type="text"
                  value={query}
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") {
                      e.preventDefault();
                      let finalSelected = selected;
                      if (query && selected.length === 0) {
                        const normalFiltered = list.filter((item) =>
                          String(item)
                            .toLowerCase()
                            .includes(query.toLowerCase().trim())
                        );
                        finalSelected = normalFiltered;
                        setSelected(normalFiltered);
                        filterEvent(normalFiltered, column);
                      } else {
                        filterEvent(selected, column);
                      }
                      popupState.close();
                    }
                  }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuery("");
                    }}
                    className="absolute right-2.5 p-0.5 rounded-full text-[#667085] hover:bg-[#F4F7F6] transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Links (Select All) */}
            <div className="flex items-center px-4 py-1 pb-2 border-b border-[#F4F7F6] select-none">
              <button
                type="button"
                onClick={() => setSelected([...filterList])}
                className="text-[12px] font-semibold text-[#0B2545] hover:underline cursor-pointer border-none bg-transparent p-0"
              >
                Select all
              </button>
            </div>

            {/* List & MenuItems */}
            <div
              style={{ width: `${listStyle.listWidth + 10}px` }}
              className="h-auto overflow-x-hidden pt-1"
            >
              {column?.type === SPECIAL && (
                <MenuItem
                  onClick={() => handleClick("__NULL__")}
                  className="!font-['Lexend'] !text-[13px] !text-[#3C4043] hover:!bg-[#F8F9FA] !py-1 !px-4"
                  sx={{ height: `${listStyle.itemSize}px !important` }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      color: '#DADCE0',
                      padding: '4px',
                      '&.Mui-checked': {
                        color: '#0B2545',
                      },
                    }}
                    checked={isSelected("__NULL__")}
                  />
                  {NULL}
                </MenuItem>
              )}
              <List
                width={listStyle.listWidth}
                height={listStyle.listHeight}
                rowCount={filterList.length}
                rowHeight={listStyle.itemSize}
                rowRenderer={({ index, style, key }) => {
                  const item = filterList[index];
                  return (
                    <Tooltip style={style} key={key} title={item}>
                      <MenuItem
                        onClick={() => handleClick(item)}
                        className="!font-['Lexend'] !text-[13px] !text-[#3C4043] hover:!bg-[#F8F9FA] !py-1 !px-4"
                        key={`${FILER_MENU_ITEM}${index}`}
                      >
                        <Checkbox
                          size="small"
                          sx={{
                            color: '#DADCE0',
                            padding: '4px',
                            '&.Mui-checked': {
                              color: '#0B2545',
                            },
                          }}
                          checked={isSelected(item)}
                        />
                        <span className="truncate">{item}</span>
                      </MenuItem>
                    </Tooltip>
                  );
                }}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex w-full items-center justify-between px-4 pt-3 pb-2 border-t border-[#F4F7F6] mt-2">
              <span
                className={clsx(
                  "text-[12px] font-semibold text-[#B42318] hover:underline transition-all",
                  {
                    "cursor-not-allowed opacity-50": !selected.length,
                    "cursor-pointer opacity-100": selected.length,
                  }
                )}
                onClick={clearFilter}
              >
                Reset
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-[6px] bg-white border border-[#DADCE0] px-3 py-1.5 text-[12px] font-semibold text-[#3C4043] hover:bg-[#F8F9FA] hover:text-[#0B2545] transition-colors cursor-pointer"
                  onClick={popupState.close}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-[6px] bg-[#0F4C3A] px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#0A3629] transition-colors cursor-pointer"
                  onClick={() => {
                    let finalSelected = selected;
                    if (query && selected.length === 0 && query.includes(",")) {
                      const values = query
                        .split(",")
                        .map((v) => v.trim().toLowerCase())
                        .filter(Boolean);

                      const bulkSelected = list.filter((item) =>
                        values.some((val) =>
                          String(item).toLowerCase().includes(val)
                        )
                      );

                      finalSelected = bulkSelected;
                      setSelected(bulkSelected);
                      filterEvent(bulkSelected, column);
                    } else if (query && selected.length === 0) {
                      const normalFiltered = list.filter((item) =>
                        String(item)
                          .toLowerCase()
                          .includes(query.toLowerCase().trim())
                      );
                      finalSelected = normalFiltered;
                      setSelected(normalFiltered);
                      filterEvent(normalFiltered, column);
                    } else {
                      filterEvent(selected, column);
                    }

                    setQuery("");
                    popupState.close();
                    if (finalSelected.length > 0) {
                      showToast.info("Filter Applied", `Filtering ${column?.title || "column"} (${finalSelected.length} items)`);
                    }
                    if (column?.is_filter_with_api) {
                      column?.on_filter_click(finalSelected, column);
                    }
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </Menu>
        </>
      )}
    </PopupState>
  );
}

export default forwardRef(FilterComponent);