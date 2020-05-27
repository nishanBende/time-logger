const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { FIELD_NAMES } = require("./constants");
const {
  INPUT_DATE_FORMAT,
  INPUT_DATE_TIME_FORMAT,
  TIMESHEET_FOLDER_PATH,
} = require("./constants");

if (!fs.existsSync(TIMESHEET_FOLDER_PATH)) {
  fs.mkdirSync(TIMESHEET_FOLDER_PATH);
}

const storeLog = (log) => {
  let date = log[FIELD_NAMES.date];
  const format1 = moment(date, INPUT_DATE_FORMAT);
  const format2 = moment(date, INPUT_DATE_TIME_FORMAT);
  if (format2.isValid()) {
    log[FIELD_NAMES.date] = format2;
  } else if (format1.isValid()) {
    log[FIELD_NAMES.date] = format1;
  }
  const fileName = getSheetName(log[FIELD_NAMES.date]);

  const filePath = path.resolve(TIMESHEET_FOLDER_PATH, fileName);
  createOrAppendInSheet(filePath, log);
};

const createOrAppendInSheet = (filePath, log) => {
  if (fs.existsSync(filePath)) {
    try {
      const jsonRes = fs.readFileSync(filePath);
      const data = JSON.parse(jsonRes);
      data.push(log);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.log(
        "Timesheet File corrupted ",
        filePath,
        "Please remove the file and try again"
      );
      throw e;
    }
  } else {
    fs.writeFileSync(filePath, JSON.stringify([log], null, 2));
  }
};

const getSheetName = (date) => {
  return date.format("MMMM-YYYY") + ".json";
};

module.exports = { storeLog, getSheetName };
