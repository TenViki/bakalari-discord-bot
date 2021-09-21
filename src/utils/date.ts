export const getFormattedDate = (d: Date) => {
  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
};

export const getFormattedDateForLogging = (d: Date) => {
  return `${d.getFullYear()}.${d.getMonth().toString().padStart(2, "0")}.${d
    .getDate()
    .toString()
    .padStart(2, "0")} ${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")} ${d
    .getMilliseconds()
    .toString()
    .padStart(4, "0")}`;
};
