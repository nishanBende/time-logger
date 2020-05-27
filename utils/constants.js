const path = require("path");
const os = require("os");
const INPUT_DATE_FORMAT = "DD/MM/YYYY";
const INPUT_DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

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
