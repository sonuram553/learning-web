const ordinal = require("ordinal");
const { days, months } = require("date-names");

formatDate = function (date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, function (tag) {
    if (tag === "YYYY") return date.getFullYear();
    if (tag === "M") return date.getMonth();
    if (tag === "MMMM") return months[date.getMonth()];
    if (tag === "D") return date.getDate();
    if (tag === "Do") return ordinal(date.getDate());
    if (tag === "dddd") return days[date.getDay()];
  });
};

exports.formatDate = formatDate;
