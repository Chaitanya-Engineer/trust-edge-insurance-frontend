export const tableComponentConstants = {
  YES: 'Yes',
  NO: 'No',
  STATUS_COLUMN: {
    COMPLETE: 'Complete',
    PENDING: 'Pending',
  },
  NA: 'N/A',
  DATE_FORMAT: 'DD/MM/YYYY',
  ARIA_LABELD_BY: 'tableTitle',
  TABLE_SIZE: 'small',
  ROW_ROLE: 'checkbox',
  TAB_INDEX: -1,
  TABLE_BG_COLOR: '#fffff',
  TABLE_BG_THEME_COLOR: {
    light: 'white',
    dark: '#32314f',
  },
  DEFAULT_ROW_COLOR: '#ffffff',
  HEAD_COLOR: '#ffffff',
  HEAD_THEME_COLOR: {
    light: '#F4F7F6',
    dark: '#0E2F52',
  },
  HEAD_TXT_THEME_COLOR: {
    light: '#667085',
    dark: '#F5F2FF',
  },
  ROW_TXT_THEME_COLOR: {
    light: '#17212B',
    dark: '#CAC6DA',
  },
  ROW_TXT_COLOR: '#17212B',
  DEFAULT_TABLE_HEIGHT: 'table-container',
  ROW_ALTERNATE_COLORS: {
    light: ['white', 'white'],
    dark: ['#32314F', '#3D3C5D'],
  },
  ROW_HOVER_COLOR: '#EAF0F6',
  ROW_HOVER_THEME_COLOR: {
    light: '#EAF0F6',
    dark: '#32314F',
  },
  SCROLL_DIRECTION: {
    LEFT: 'left',
    RIGHT: 'right',
  },
};
export const tableComponentStyleConstants = {
  STATUS_COLUMN: {
    Completed: {
      color: "#82C1A7",
    },
    Pending: {
      color: "#FF6565",
    },
  },

  ROW_STYLE: (backgroundColor) => {
    return {
      "&.Mui-selected": {
        backgroundColor,

        "& > .MuiTableCell-root": {
          fontWeight: "500",
        },
      },

      "&.MuiTableRow-root": {
        backgroundColor: "transparent",
      },
    };
  },

  TABLE_STYLE: (tableCellClasses, theme = 'light', tableLayout = 'auto') => {
    return {
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "1px solid #E5E9E7",
        backgroundColor:
          tableComponentConstants?.TABLE_BG_THEME_COLOR[theme] ??
          tableComponentConstants?.TABLE_BG_COLOR ??
          "white",
      },

      tableLayout,
      maxWidth: "100%",
      // borderCollapse: "separate",
    };
  },
};
export const tableDataTypes = {
  ARRAY: 'array',
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  DATE: 'date',
  SPECIAL: 'special',
  INFO: 'info',
  CLICK: 'click',
  SUBHEADER: 'subheader',
  MERGES: 'merges',
};

export const tableRowConstants = {
  LABLE_ID: 'enhanced-table-checkbox-',
  RADIO: {
    SIZE: 'small',
  },
  LABLED_BY: 'aria-labelledby',
  TEXT_ELLIPSIS: (cellWidth) => ({
    maxWidth: cellWidth,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  COPIED: 'Copied!',
};

export const tableHeadConstants = {
  CHECKBOX: {
    PADDING: 'checkbox'
  },
  SRNO: 'Sr. No.'
}

export const filterComponentConstants = {
  CLEAR: 'Clear',
  CLEAR_ALL: 'Clear All',
  SELECT_ALL: 'SELECT ALL',
  NULL: 'BLANK VALUES',
  SELECT_FILTERED: 'SELECT ALL SEARCHED',
  DATE_FORMAT: 'DD/MM/YYYY',
  VARIENT: 'popover',
  POPUP_ID: 'demo-popup-menu',
  TOOLTIP_TITLE: 'Filter',
  INPUT_TYPES: {
    TEXT: 'text',
  },
  CHECKBOX: {
    SIZE: 'small',
  },
  FILER_MENU_ITEM: 'filterMenuItem',
  BUTTONS: {
    CANCEL: 'CANCEL',
    OK: 'OK',
  },
};

export const filterComponentStyleConstants = {
  CANCEL_BUTTON: {
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  OK_BUTTON: {
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    width: '2.56vw',
  },
  ICON_BUTTON: (selected, backgroundColor) => {
    const conditionalColors = selected.length && {
      color: '#fff',
      backgroundColor,
    };
    return {
      color: backgroundColor,
      ['&:hover']: {
        color: '#fff',
        backgroundColor,
      },
      ...conditionalColors,
    };
  },
};

