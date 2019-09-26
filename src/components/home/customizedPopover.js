import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BtnSpecifiedColor from "../btnSpecifiedColor/BtnSpecifiedColor";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../customizedSnackbars/CustomizedSnackbars";
import { validateStartEnd, isFuture } from "../../helpers/validateStartEndTime";
import endSpaceRemover from "../../helpers/endSpaceRemover";

const useStylesPaper = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
    // height: "100%",
    // width: "100%"
  }
}));

export default function CustomizedPopover({
  btnText,
  btnColor,
  btnHoverColor,
  btnWidth,
  btnHeight,
  socket,
  eventId
}) {
  const classesPaper = useStylesPaper();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    location: "",
    picture: "",
    description: "",
    error: "",
    start_time: new Date(),
    end_time: new Date()
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    const handleReceiveEditableData = data => {
      setEditData({
        ...data.details,
        start_time: new Date(data.details.start_time),
        end_time: new Date(data.details.end_time)
      });
    };
    socket.on(`receiveEditableData-${eventId}`, handleReceiveEditableData);
    socket.on(`editResponse-${eventId}`, handleClose);
    return () => {
      socket.removeListener(
        `receiveEditableData-${eventId}`,
        handleReceiveEditableData
      );
      socket.removeListener(`editResponse-${eventId}`, handleClose);
    };
  }, [socket]);

  useEffect(() => {
    if (open) {
      socket.emit("retrieveEditableEventData", eventId);
    } else {
      setEditData({
        name: "",
        location: "",
        picture: "",
        description: "",
        error: "",
        start_time: new Date(),
        end_time: new Date()
      });
    }
  }, [open]);

  const handleEventForm = event => {
    setEditData({ ...editData, [event.target.id]: event.target.value });
  };

  const handleSetStartTime = date => {
    setEditData({
      ...editData,
      start_time: date
    });
  };

  const handleSetEndTime = date => {
    setEditData({
      ...editData,
      end_time: date
    });
  };

  return (
    <div>
      <BtnSpecifiedColor
        text={btnText}
        onClick={handleClickOpen}
        color={btnColor}
        hoverColor={btnHoverColor}
        width={btnWidth}
        height={btnHeight}
      ></BtnSpecifiedColor>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit the event</DialogTitle>
        <DialogContent>
          <Paper className={classesPaper.root}>
            {editData.error && (
              <CustomizedSnackbars
                variant={"error"}
                message={editData.error}
                onClose={() => {
                  setEditData({ ...editData, error: "" });
                }}
              ></CustomizedSnackbars>
            )}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  label="Start date"
                  format="MM/dd/yyyy"
                  value={editData.start_time}
                  onChange={handleSetStartTime}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Start time"
                  value={editData.start_time}
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
                  value={editData.end_time}
                  onChange={handleSetEndTime}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="End time"
                  value={editData.end_time}
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
                value={editData.name}
                onChange={handleEventForm}
                label="Event name"
                margin="normal"
              />
              <TextField
                id="location"
                value={editData.location}
                onChange={handleEventForm}
                label="location"
                margin="normal"
              />
              <TextField
                id="picture"
                value={editData.picture}
                onChange={handleEventForm}
                label="Photo URL"
                margin="normal"
              />
              <TextField
                id="description"
                value={editData.description}
                onChange={handleEventForm}
                label="Description"
                multiline
                rows="10"
                margin="normal"
              />
            </div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const errMsg = validateSubmission(editData);
              setEditData({ ...editData, error: errMsg });
              if (!errMsg) {
                socket.emit("editEvent", {
                  id: eventId,
                  start: editData.start_time,
                  end: editData.end_time,
                  name: editData.name,
                  picture: editData.picture,
                  description: editData.description,
                  location: editData.location
                });
              }
            }}
            color="primary"
          >
            Customize
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const validateSubmission = createData => {
  if (isNaN(createData.start_time.getTime())) {
    return "Start time is in wrong format!";
  } else if (!isFuture(createData.start_time.getTime())) {
    return "Start time cannot be in the past!";
  } else if (isNaN(createData.end_time.getTime())) {
    return "End time is in wrong format!";
  } else if (!isFuture(createData.end_time.getTime())) {
    return "End time cannot be in the past!";
  } else if (
    !validateStartEnd(
      createData.start_time.getTime(),
      createData.end_time.getTime()
    )
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
