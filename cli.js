#! /usr/bin/env node
const chalk = require("chalk");
const path = require("path");
const open = require("open");
const { storeLog, getSheetName } = require("./utils/storeTimeSheet");
const getWorkLogPromptFields = require("./utils/getFormFields");
const {
  FIELD_NAMES,
  INPUT_DATE_TIME_FORMAT,
  TIMESHEET_FOLDER_PATH,
} = require("./utils/constants");
const fs = require("fs");
const moment = require("moment");

const argv = require("yargs")
  .describe("i", "Project name")
  .describe("o", "Open saved timesheet file i.e. May-2020.json")
  .help("help").argv;

const getProjectName = () => {
  return argv.p;
};

const main = async () => {
  if (argv.o) {
    handleOpenSheet();
  } else {
    const promptResonse = await getPromptResponse();
    try {
      await storeLog(promptResonse);
      console.log(
        chalk.green(
          "Log Saved. Record: ",
          JSON.stringify(promptResonse, null, 2)
        )
      );
      console.log("File Path: ", TIMESHEET_FOLDER_PATH);
    } catch (e) {
      console.log(e);
    }
  }
};

const handleOpenSheet = () => {
  if (typeof argv.o === "string") {
    sheetPath = path.resolve(TIMESHEET_FOLDER_PATH, argv.o);
  } else {
    sheetPath = path.resolve(TIMESHEET_FOLDER_PATH, getSheetName(moment()));
  }
  if (fs.existsSync(sheetPath)) {
    open(sheetPath);
  } else {
    console.log(chalk.red("Sheet doesn't exist!", sheetPath));
  }
};

const getPromptResponse = async () => {
  const projectName = getProjectName();
  let promptResonse;
  if (!projectName) {
    promptResonse = await getWorkLogPromptFields(true);
  } else {
    promptResonse = await getWorkLogPromptFields(false);
    promptResonse[FIELD_NAMES.projectName] = projectName;
  }

  // Enter today's date if date is not entered
  if (!promptResonse[FIELD_NAMES.date]) {
    promptResonse[FIELD_NAMES.date] = moment(
      new Date(),
      INPUT_DATE_TIME_FORMAT
    );
  }

  return promptResonse;
};

main();
