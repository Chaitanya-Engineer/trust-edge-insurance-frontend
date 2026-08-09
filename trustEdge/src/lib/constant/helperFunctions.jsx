import moment from "moment";

export const checkObjectNotEmpty = (data) => JSON.stringify(data) !== "{}";
export const convertArrayToString = (data) =>
  (data.length && [...data].join(", ")) || null;

export const formatDate = (date, formatType = "yyyy-MM-DD") => {
  if (!date) {
    return "--";
  }

  return moment(date).format(formatType);
};
