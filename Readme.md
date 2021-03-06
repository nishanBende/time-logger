## Time logger

### Installation

- Requires NodeJS

```
npm install -g https://github.com/nishanBende/time-logger
```

### Start Logging

```
log-task
```

### Optional flags

```
log-task -p [projectname]
```

```
log-task -o [sheetName e.g. May-2020.json]

// If sheet name is not passed opens current [Month]-[Year].json

```

```
// For more info
log-task --help
```

`Note: Timesheet files are saved in HOME_DIR/time-logs/[Month]-[Year].json`

#### Feature Checklist

- [x] Split log files automatically by Month-Year format.
- [ ] Make it easier to install for non-developers (needs discussion).
- [ ] Export Logs in word/csv
- [ ] Support Keka clock-in/clock-out with a single toggle command
- [ ] Integrate JIRA support from https://github.com/solutelabs/jira-time-logger
