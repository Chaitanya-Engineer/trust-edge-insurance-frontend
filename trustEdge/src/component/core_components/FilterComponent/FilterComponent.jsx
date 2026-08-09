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
    filterEvent([], column);
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
              className="!rounded-[5px] !p-0 opacity-90"
              sx={{
                ...ICON_BUTTON(
                  selected,
                  selected.length
                    ? "var(--btn-primary)"
                    : "var(--secondary-icon)"
                ),
              }}
              {...bindTrigger(popupState)}
            >
              <ListFilter className={sizes} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: "#ffff !important",
              },
            }}
            {...bindMenu(popupState)}
          >
            <div className="">
              <div className="flex h-14 w-full flex-col items-center justify-center">
                <div className="flex h-10 w-56 items-center justify-around rounded-[5px] border border-solid border-[lightgray] bg-calender-header-bg 2k:h-14 2k:w-80 4k:h-16 4k:w-96">
                  <input
                    className="h-9 w-48 border-none bg-calender-header-bg pl-5 text-fluid-table-cell text-paper-txt outline-none 2k:h-12 2k:w-72 4k:h-14 4k:w-80"
                    type={TEXT}
                    onChange={({ target: { value } }) => setQuery(value)}
                  />
                  <Search className="text-table-filter-txt 4k:!size-10" />
                </div>
              </div>
            </div>

            <div
              style={{ width: `${listStyle.listWidth + 10}px` }}
              className="h-auto overflow-x-hidden"
            >
              <MenuItem
                sx={{ height: `${listStyle.itemSize}px !important` }}
                className="!font-sans !text-base !text-table-filter-txt 2k:!text-2xl 4k:!text-4xl"
              >
                <Checkbox
                  size={
                    (displayWidth <= 1920 && "small") ||
                    (displayWidth > 1920 && displayWidth <= 2560 && "medium") ||
                    (displayWidth > 2560 && "large") ||
                    "small"
                  }
                  className="!text-checkbox-border"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                />
                {SELECT_ALL}
              </MenuItem>
              {column?.type === SPECIAL && (
                <MenuItem
                  onClick={() => handleClick("__NULL__")}
                  className="!font-sans !text-base !text-table-filter-txt 2k:!text-2xl 4k:!text-4xl"
                >
                  <Checkbox
                    size={
                      (displayWidth <= 1920 && "small") ||
                      (displayWidth > 1920 &&
                        displayWidth <= 2560 &&
                        "medium") ||
                      (displayWidth > 2560 && "large") ||
                      "small"
                    }
                    className="!text-checkbox-border"
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
                        className="!font-sans !text-base !text-table-filter-txt 2k:!text-2xl 4k:!text-4xl"
                        key={`${FILER_MENU_ITEM}${index}`}
                      >
                        <Checkbox
                          size={
                            (displayWidth <= 1920 && "small") ||
                            (displayWidth > 1920 &&
                              displayWidth <= 2560 &&
                              "medium") ||
                            (displayWidth > 2560 && "large") ||
                            "small"
                          }
                          className="!text-checkbox-border"
                          checked={isSelected(item)}
                        />
                        {item}
                      </MenuItem>
                    </Tooltip>
                  );
                }}
              />
            </div>

            <div className="flex w-full items-center justify-around pt-2">
              <span
                className={clsx(
                  "text-fluid-table-filter font-bold tracking-wide text-title-txt",
                  {
                    "cursor-not-allowed opacity-50": !selected.length,
                    "cursor-pointer opacity-100": selected.length,
                  }
                )}
                onClick={clearFilter}
              >
                {CLEAR}
              </span>
              <div className="flex w-auto justify-between gap-4">
                <button
                  className="rounded-sm bg-primary-normal px-3 py-1 text-fluid-table-filter text-calender-btn-txt"
                  onClick={popupState.close}
                >
                  Cancel
                </button>
                <button
                  className="rounded-sm bg-primary-normal px-3 py-1 text-fluid-table-filter text-calender-btn-txt"
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
                    if (column?.is_filter_with_api) {
                      column?.on_filter_click(finalSelected, column);
                    }
                  }}
                >
                  Ok
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
