import {
  Box,
  Paper,
  TableRow as Row,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
} from "@mui/material";
import moment from "moment";
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TableVirtuoso } from "react-virtuoso";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { checkObjectNotEmpty } from "../../../lib/constant/helperFunctions";
import {
  tableComponentConstants,
  tableComponentStyleConstants,
  tableDataTypes,
} from "./Constant";

const filterValues = {};

const Scroller = forwardRef((props, ref) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: props?.context?.borderRadius ?? "4px",
      }}
      {...props}
      ref={ref}
    />
  );
});

// const Scroller = forwardRef((props, ref) => {
//   return <div ref={ref} {...props} style={{ overflow: 'auto' }} />;
// });

function TBL(props) {
  const { TABLE_STYLE } = tableComponentStyleConstants;

  const { ARIA_LABELD_BY, TABLE_SIZE } = tableComponentConstants;

  const tableLayout = props?.context?.type ?? "auto";

  return (
    <Table
      stickyHeader
      sx={TABLE_STYLE(tableCellClasses, tableLayout, props?.context?.theme)}
      aria-labelledby={ARIA_LABELD_BY}
      size={TABLE_SIZE}
      {...props}
      style={{
        borderCollapse: "separate",
        height: props.context.dataLength > 0 ? "" : "100%",
      }}
    />
  );
}

const THead = Fragment;

function TRow({ item, ...props }) {
  const { ROW_STYLE } = tableComponentStyleConstants;

  const { ROW_ROLE, TAB_INDEX } = tableComponentConstants;

  const {
    context: {
      theme,
      isSelected,
      isRadio,
      rowColor,
      setRadioChecked,
      setSelection,
      onRowClick,
    },
  } = props;

  const isItemSelected = isSelected(item);

  const rowSelect = () => {
    if (isRadio) {
      setRadioChecked(item);
      setSelection([item]);
    } else {
      onRowClick && onRowClick(item);
    }
  };

  return (
    <>
      <Row
        hover
        onClick={rowSelect}
        role={ROW_ROLE}
        aria-checked={isItemSelected}
        tabIndex={TAB_INDEX}
        selected={isItemSelected}
        sx={{
          ...ROW_STYLE(rowColor),
          backgroundColor:
            props["data-index"] % 2 == 0
              ? tableComponentConstants?.ROW_ALTERNATE_COLORS[theme][0]
              : tableComponentConstants?.ROW_ALTERNATE_COLORS[theme][1],
        }}
        {...props}
      />
    </>
  );
}

const TBody = forwardRef(({ children, ...rest }, ref) => {
  const {
    context: { loading, dataLength, endReached, headerLength },
  } = rest;

  return (
    <>
      {loading && !endReached && (
        <TableBody
          style={{
            width: "100%",
          }}
        >
          <Row>
            <TableCell
              style={{
                textAlign: "center",
              }}
              colSpan={headerLength ? headerLength + 1 : 20}
            >
              {/* <Loader height="5rem" width="5rem" /> */}
              Loading
            </TableCell>
          </Row>
        </TableBody>
      )}
      {loading && endReached && (
        <TableBody {...rest} ref={ref}>
          {children}
          <Row>
            <TableCell
              style={{
                textAlign: "center",
              }}
              colSpan={headerLength ? headerLength + 1 : 20}
            >
              {/* <Loader height="5rem" width="5rem" /> */}
              Loading
            </TableCell>
          </Row>
        </TableBody>
      )}
      {!loading && dataLength && (
        <TableBody {...rest} ref={ref}>
          {children}
        </TableBody>
      )}
      {!loading && !dataLength && (
        <TableBody
          style={{
            width: "100%",
          }}
        >
          <Row>
            <TableCell
              style={{
                textAlign: "center",
              }}
              colSpan={headerLength ? headerLength + 1 : 10}
            >
              {/* <NoDataFound /> */}
              NO DATA FOUND
            </TableCell>
          </Row>
        </TableBody>
      )}
    </>
  );
});

const TableComponent = forwardRef(
  (
    {
      theme = "light",
      id = "id",
      rowColor = tableComponentConstants.DEFAULT_ROW_COLOR,
      dataSourceSize,
      defaultHeaders,
      defaultSelected,
      radioChecked: propRadioChecked,
      headColor = tableComponentConstants.HEAD_THEME_COLOR ??
        tableComponentConstants.HEAD_COLOR,
      dataSource: propDataSource,
      selection = () => {},
      // tableStyle = {},
      isCheckbox = true,
      isHash = false,
      isSelection = true,
      isRadio = false,
      borderRadius = "4px",
      onRowClick,
      specialCellStyleFunction = () => {},
      className = "",
      loading = false,
      endReached,
      fixed = false,
      auto = false,
      stickyColumns = false,
      onCellClick = () => {},
    },
    ref
  ) => {
    const { DATE_FORMAT, NO, YES } = tableComponentConstants;

    const { ARRAY, DATE, BOOLEAN } = tableDataTypes;

    const [selected, setSelected] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [radioChecked, setRadioChecked] = useState({});

    const headerRef = useRef();
    const tableVirtuosoRef = useRef(null);

    const numSelected = selected?.length;
    const rowCount = dataSource?.length;

    const [order, setOrder] = useState(null);
    const [orderBy, setOrderBy] = useState(null);

    const [selectedFilters, setSelectedFilters] = useState([]);

    useImperativeHandle(
      ref,
      () => ({
        dataSource,
        is_filter: checkObjectNotEmpty(filterValues),
        filters: selectedFilters,
        clearApiFilter,
      }),
      [dataSource, filterValues, selectedFilters]
    );

    useEffect(() => {
      isRadio && propRadioChecked && setSelection([propRadioChecked]);
    }, []);

    useEffect(() => {
      if (order && orderBy)
        setDataSource([...propDataSource].sort(getComparator(order, orderBy)));
      else setDataSource(propDataSource);

      const apiFilterAccessors =
        headCells
          ?.filter((h) => h?.is_filter_with_api)
          ?.map((h) => h?.accessor) ?? [];
      setSelectedFilters((prev) =>
        prev.filter((f) => apiFilterAccessors?.includes(f?.label))
      );

      clearFilterValues(apiFilterAccessors);
    }, [propDataSource]);

    useEffect(() => {
      setHeadCells(defaultHeaders ?? []);
      setSelected([]);
      !!dataSourceSize && dataSourceSize(dataSource?.length);
    }, [dataSource, defaultHeaders]);

    useEffect(() => {
      defaultSelected && setSelected(defaultSelected);
    }, [defaultSelected]);

    useEffect(() => {
      propRadioChecked && setRadioChecked(propRadioChecked);
    }, [propRadioChecked]);

    // prepare sort comparators
    // const descendingComparator = (a: any, b: any, orderBy: string) => {
    //   if (b[orderBy] < a[orderBy]) {
    //     return -1;
    //   }
    //   if (b[orderBy] > a[orderBy]) {
    //     return 1;
    //   }
    //   return 0;
    // };
    const getComparator = (order, orderBy) => {
      const column = headCells?.find((col) => col?.accessor === orderBy);

      return (a, b) => {
        let aValue;
        let bValue;

        // Handle special column
        if (column?.type === "special" && column?.sortValue) {
          aValue = column?.sortValue(a);
          bValue = column?.sortValue(b);
        } else {
          aValue = a[orderBy];
          bValue = b[orderBy];
        }

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "desc" ? bValue - aValue : aValue - bValue;
        }

        return order === "desc"
          ? String(bValue).localeCompare(String(aValue))
          : String(aValue).localeCompare(String(bValue));
      };
    };
    useEffect(() => {
      // console.log('useEffect Handlening Sort ====> ', dataSource);
      if (dataSource?.length > 0) {
        if (order === null) {
          setDataSource(propDataSource); // Reset to unsorted data
        } else {
          setDataSource([...dataSource].sort(getComparator(order, orderBy)));
        }
      }
    }, [order, orderBy]);

    // event handler to handle onClick for sorting table
    const handleSort = (columnData) => {
      let newOrder = null;

      if (orderBy === columnData?.accessor) {
        if (order === "desc") newOrder = "asc";
        else if (order === "asc") newOrder = null;
        else newOrder = "desc";
      } else {
        newOrder = "desc";
      }

      setOrder(newOrder);
      setOrderBy(newOrder ? columnData?.accessor : null);
    };

    function setSelection(arr) {
      selection && selection(arr);
    }

    function clearApiFilter(accessor) {
      const accessors = Array.isArray(accessor) ? accessor : [accessor];

      headerRef.current?.resetSpecificFilters(accessors);

      setSelectedFilters((prev) =>
        prev.filter((f) => !accessors.includes(f?.label))
      );
    }

    function clearFilterValues(preserveAccessors = []) {
      headerRef.current?.resetFilter(preserveAccessors);
      for (let key in filterValues) {
        if (preserveAccessors?.includes(key)) continue;
        delete filterValues[key];
      }
    }

    function findSelectedIndex(obj) {
      return selected.findIndex((select) => obj[id] === select[id]);
    }

    function handleSelectAllClick({ target: { checked } }) {
      if (checked) {
        const newSelected = JSON.parse(JSON.stringify(dataSource));
        setSelection(newSelected);
        setSelected(newSelected);
        return;
      }
      setSelection([]);
      setSelected([]);
    }

    function handleClick(obj) {
      const selectedIndex = findSelectedIndex(obj);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, obj);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected?.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelection(newSelected);
      setSelected(newSelected);
    }

    function isSelected(obj) {
      return findSelectedIndex(obj) !== -1;
    }

    function getFilterData(data = []) {
      return data.reduce((acc, cur) => {
        for (const key in filterValues) {
          const { type, filterFunction } = filterValues[key];
          if (type === ARRAY) {
            if (
              filterValues[key].selected.some(
                (val) => cur[key] && cur[key].includes(val)
              )
            )
              continue;
            else return acc;
          }
          if (type === "special") {
            if (type === "special") {
              if (filterFunction) {
                const resolvedValue = filterFunction(cur) ?? "__NULL__";
                if (!filterValues[key].selected?.includes(resolvedValue))
                  return acc;
              }
            }
          } else if (type === BOOLEAN) {
            const keys = {
              [YES]: true,
              [NO]: false,
            };
            if (
              filterValues[key].selected.some((val) => cur[key] === keys[val])
            )
              continue;
            else return acc;
          } else {
            const data =
              type === DATE ? moment(cur[key]).format(DATE_FORMAT) : cur[key];
            if (!filterValues[key].selected.includes(data)) return acc;
          }
        }
        return [...acc, cur];
      }, []);
    }

    function filterDataSource(filterList, column) {
      const columnAccessor = column.accessor;
      const data = JSON.parse(JSON.stringify(propDataSource));
      filterList?.length <= 0 && delete filterValues[columnAccessor];

      if (filterList?.length <= 0) {
        const options = selectedFilters?.filter(
          (o) => o?.label !== column?.accessor
        );
        setSelectedFilters(options);
      } else {
        const matchingFilters = selectedFilters?.find(
          (o) => o?.label === column?.accessor
        );

        if (matchingFilters) {
          const updatedValues = selectedFilters?.map((o) => {
            if (o?.label === column?.accessor) {
              o.value = filterList;
              return o;
            }
            return o;
          });
          setSelectedFilters(updatedValues);
        } else {
          setSelectedFilters((prev) => [
            ...prev,
            {
              label: column?.accessor,
              value: filterList,
            },
          ]);
        }
      }

      switch (true) {
        case filterList?.length > 0:
          !filterValues[columnAccessor] &&
            (filterValues[columnAccessor] = {
              selected: [],
              type: column.type,
            });
          filterValues[columnAccessor].selected = filterList;

          if (column?.filterFunction) {
            filterValues[columnAccessor].filterFunction =
              column?.filterFunction;
          }

          setDataSource(getFilterData(data));
          break;
        case checkObjectNotEmpty(filterValues):
          setDataSource(getFilterData(data));
          break;
        default:
          setDataSource(data);
          break;
      }
    }

    function reorder(list, startIndex, endIndex) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }

    function onDragEnd(result) {
      if (!result.destination) return;
      setHeadCells(
        reorder(headCells, result.source.index, result.destination.index)
      );
    }

    function fixedHeaderContent() {
      return (
        <TableHead
          ref={headerRef}
          theme={theme}
          dataSource={dataSource}
          headColor={headColor}
          filterDataSource={filterDataSource}
          handleSelectAllClick={handleSelectAllClick}
          headers={headCells}
          isCheckbox={isCheckbox}
          isHash={isHash}
          isSelection={isSelection}
          numSelected={numSelected}
          onDragEnd={onDragEnd}
          rowCount={rowCount}
          handleSort={handleSort}
          orderBy={orderBy}
          order={order}
          clickable={onRowClick ? true : false}
          stickyColumns={stickyColumns}
        />
      );
    }

    function itemContent(index, row) {
      return (
        <TableRow
          row={row}
          theme={theme}
          index={index}
          headers={headCells}
          isSelected={isSelected}
          radioChecked={radioChecked}
          isSelection={isSelection}
          isHash={isHash}
          isCheckbox={isCheckbox}
          isRadio={isRadio}
          onChecked={handleClick}
          clickable={onRowClick ? true : false}
          specialCellStyleFunction={specialCellStyleFunction}
          onCellClick={onCellClick}
          stickyColumns={stickyColumns}
        />
      );
    }

    return (
      <Box
        className={`mb-0 h-full w-full !overflow-hidden border-none bg-tablebg shadow-none ${className}`}
      >
        <TableVirtuoso
          ref={tableVirtuosoRef}
          data={dataSource}
          endReached={endReached}
          style={{ background: "var(--calender-bg)" }}
          components={{
            Scroller,
            Table: TBL,
            TableHead: THead,
            TableRow: TRow,
            TableBody: TBody,
          }}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={itemContent}
          context={{
            theme,
            type: auto ? "auto" : fixed ? "fixed" : "auto",
            isSelected,
            rowColor,
            isRadio,
            setRadioChecked,
            setSelection,
            onRowClick,
            loading,
            endReached,
            dataLength: dataSource?.length > 0,
            headerLength: defaultHeaders?.length,
            borderRadius: borderRadius,
          }}
        />
      </Box>
    );
  }
);

export default TableComponent;
