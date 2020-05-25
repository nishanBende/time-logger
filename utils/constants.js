const INPUT_DATE_FORMAT = "DD/MM/YY";
const path = require("path");
const INPUT_DATE_TIME_FORMAT = "DD/MM/YY HH:MM";
const os = require("os");

const TIMESHEET_FOLDER_PATH = path.resolve(os.homedir(), "time-logs");

const FIELD_NAMES = {
  projectName: "projectName",
  date: "date",
  timeSpent: "timeSpent",
  description: "description",
};

module.exports = {
  INPUT_DATE_TIME_FORMAT,
  INPUT_DATE_FORMAT,
  FIELD_NAMES,
  TIMESHEET_FOLDER_PATH,
};
