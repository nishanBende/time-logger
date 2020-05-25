#! /usr/bin/env node
const chalk = require("chalk");
const argv = require("yargs").argv;
const storeLog = require("./utils/storeTimeSheet");
const getWorkLogPromptFields = require("./utils/getFormFields");
const { FIELD_NAMES, INPUT_DATE_TIME_FORMAT } = require("./utils/constants");
const moment = require("moment");

const getProjectName = () => {
  return argv.p;
};

const main = async () => {
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

  try {
    await storeLog(promptResonse);
    console.log(
      chalk.green("Log Saved. Record: ", JSON.stringify(promptResonse, null, 2))
    );
  } catch (e) {
    console.log(e);
  }
};

main();
