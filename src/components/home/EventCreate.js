import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomizedSnackbars from "../customizedSnackbars/CustomizedSnackbars";
import "./EventCreate.css";
import { validateStartEnd, isFuture } from "../../helpers/validateStartEndTime";
import endSpaceRemover from "../../helpers/endSpaceRemover";

// ----------------------------------------------

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStylesPaper = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
    // height: "100%",
    // width: "100%"
  }
}));

export default function EventCreate({ createData, setCreateData }) {
  const classesPaper = useStylesPaper();

  const handleEventForm = event => {
    setCreateData({ ...createData, [event.target.id]: event.target.value });
  };

  const handleSetStartTime = date => {
    setCreateData({
      ...createData,
      start: date,
      warning: isNaN(date.getTime())
        ? "Start time is not valid"
        : isFuture(date.getTime())
        ? isNaN(date.getTime())
          ? `Start time's format is not valid`
          : isNaN(createData.start.getTime())
          ? `End time's format is not valid`
          : validateStartEnd(date.getTime(), createData.start.getTime())
          ? !createData.warning || createData.warning[0] !== "E"
            ? ""
            : createData.warning
          : "The start is not before end time!"
        : "Start time is in the past!"
    });
  };

  const handleSetEndTime = date => {
    setCreateData({
      ...createData,
      end: date,
      warning: isNaN(date.getTime())
        ? "End time is not valid"
        : isFuture(date.getTime())
        ? isNaN(date.getTime())
          ? `End time's format is not valid`
          : isNaN(createData.start.getTime())
          ? `Start time's format is not valid`
          : validateStartEnd(createData.start.getTime(), date.getTime())
          ? !createData.warning || createData.warning[0] !== "S"
            ? ""
            : createData.warning
          : "The end is not after start time!"
        : "End time is in the past!"
    });
  };

  const handleSubmission = () => {
    const err = validateSubmission(createData);
    setCreateData({
      ...createData,
      trigger: err ? false : true,
      error: err,
      warning: "",
      name: endSpaceRemover(createData.name),
      location: endSpaceRemover(createData.location),
      picture: endSpaceRemover(createData.picture)
    });
  };

  return (
    <Paper className={classesPaper.root}>
      {createData.error && (
        <CustomizedSnackbars
          variant={"error"}
          message={createData.error}
          onClose={() => {
            setCreateData({ ...createData, error: "" });
          }}
        ></CustomizedSnackbars>
      )}
      {createData.warning && (
        <CustomizedSnackbars
          variant={"warning"}
          message={createData.warning}
          onClose={() => {
            setCreateData({ ...createData, warning: "" });
          }}
        ></CustomizedSnackbars>
      )}
      <Typography variant="h4" component="h2" id="createTitle">
        Create an event here
      </Typography>
      <Typography component="p">
        Fill out the following required info and start your event now!
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            label="Start date"
            format="MM/dd/yyyy"
            value={createData.start}
            onChange={handleSetStartTime}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="Start time"
            value={createData.start}
            onChange={handleSetStartTime}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            label="End date"
            format="MM/dd/yyyy"
            value={createData.end}
            onChange={handleSetEndTime}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="End time"
            value={createData.end}
            onChange={handleSetEndTime}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div id="formWrap">
        <TextField
          id="name"
          value={createData.name}
          onChange={handleEventForm}
          label="Event name"
          margin="normal"
        />
        <TextField
          id="location"
          value={createData.location}
          onChange={handleEventForm}
          label="location"
          margin="normal"
        />
        <TextField
          id="picture"
          value={createData.picture}
          onChange={handleEventForm}
          label="Photo URL"
          margin="normal"
        />
        <TextField
          id="description"
          value={createData.description}
          onChange={handleEventForm}
          label="Description"
          multiline
          rows="10"
          margin="normal"
        />
      </div>
      <div id="submitBtnWrapper">
        <Button variant="contained" color="primary" onClick={handleSubmission}>
          Start the event!
        </Button>
      </div>
    </Paper>
  );
}

const validateSubmission = createData => {
  if (isNaN(createData.start.getTime())) {
    return "Start time is in wrong format!";
  } else if (!isFuture(createData.start.getTime())) {
    return "Start time cannot be in the past!";
  } else if (isNaN(createData.end.getTime())) {
    return "End time is in wrong format!";
  } else if (!isFuture(createData.end.getTime())) {
    return "End time cannot be in the past!";
  } else if (
    !validateStartEnd(createData.start.getTime(), createData.end.getTime())
  ) {
    return "End time must be after the start time!";
  } else if (!endSpaceRemover(createData.name)) {
    return "The event title must not be empty!";
  } else if (!endSpaceRemover(createData.picture)) {
    return "Please add a photo for your event!";
  } else {
    return "";
  }
};
