const fs = require("fs");
const path = require("path");
const os = require("os");
const moment = require("moment");
const { FIELD_NAMES } = require("./constants");
const { INPUT_DATE_FORMAT, INPUT_DATE_TIME_FORMAT } = require("./constants");
const timeSheetPath = path.resolve(os.homedir(), "time-logs");

if (!fs.existsSync(timeSheetPath)) {
  fs.mkdirSync(timeSheetPath);
}

const storeLog = (log) => {
  let date = log[FIELD_NAMES.date];
  const format1 = moment(date, INPUT_DATE_FORMAT);
  const format2 = moment(date, INPUT_DATE_TIME_FORMAT);
  let validDate;
  if (format1.isValid()) {
    validDate = format1;
  } else if (format2.isValid()) {
    validDate = format2;
  }

  const fileName = getSheetName(validDate);

  const filePath = path.resolve(timeSheetPath, fileName + ".json");
  createOrAppendInSheet(filePath, log);
};

const createOrAppendInSheet = (filePath, log) => {
  if (fs.existsSync(filePath)) {
    try {
      const jsonRes = fs.readFileSync(filePath);
      const data = JSON.parse(jsonRes);
      data.push(log);
      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (e) {
      console.log(
        "Timesheet File corrupted ",
        filePath,
        "Please remove the file and try again"
      );
      throw e;
    }
  } else {
    fs.writeFileSync(filePath, JSON.stringify([log]));
  }
};

const getSheetName = (date) => {
  return date.format("MMMM-YYYY");
};

module.exports = storeLog;
