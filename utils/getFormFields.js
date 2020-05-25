const prompts = require("prompts");
const moment = require("moment");
const {
  INPUT_DATE_FORMAT,
  INPUT_DATE_TIME_FORMAT,
  FIELD_NAMES,
} = require("./constants");

const getWorkLogPromptFields = (showProjectPrompt) => {
  let formFields = defaultFormFields;
  if (showProjectPrompt) {
    const projectPrompt = {
      type: "text",
      name: FIELD_NAMES.projectName,
      validate: (value) => (value ? true : "Please enter a project name"),
      message: `Enter Project name`,
    };
    formFields = [projectPrompt, ...defaultFormFields];
  }

  return prompts(formFields, {
    onCancel: () => {
      process.exit();
    },
  });
};

const numberValidator = (value, _message) => {
  if (!value || isNaN(value)) {
    return "Enter a number";
  }

  return true;
};

const defaultFormFields = [
  {
    type: "text",
    name: FIELD_NAMES.description,
    validate: (value) => (value ? true : "Please enter a task description"),
    message: `Enter Task description (or hard to remember ticket number)`,
  },
  {
    type: "text",
    name: FIELD_NAMES.timeSpent,
    validate: (value) => numberValidator(value, "Enter Time spent"),
    message: `Enter Time Spent in hours eg. 1, 2, 1.5`,
  },
  {
    type: "text",
    name: FIELD_NAMES.date,
    validate: (value) => {
      if (
        !value ||
        moment(value, INPUT_DATE_FORMAT).isValid() ||
        moment(value, INPUT_DATE_TIME_FORMAT).isValid()
      ) {
        return true;
      } else {
        return `Enter valid date e.g. ${INPUT_DATE_FORMAT} or ${INPUT_DATE_TIME_FORMAT}`;
      }
    },
    message: `Enter start date e.g. ${INPUT_DATE_FORMAT} or ${INPUT_DATE_TIME_FORMAT} (optional)`,
  },
];

module.exports = getWorkLogPromptFields;
