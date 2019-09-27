import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BtnSpecifiedColor from "../btnSpecifiedColor/BtnSpecifiedColor";
import Cookies from "universal-cookie";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../customizedSnackbars/CustomizedSnackbars";
import endSpaceRemover from "../../helpers/endSpaceRemover";

const useStylesPaper = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function CustomizedPopover({
  btnText,
  btnColor,
  btnHoverColor,
  btnWidth,
  btnHeight,
  socket,
  profile,
  setProfile
}) {
  const classesPaper = useStylesPaper();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    first_name: profile.firstName,
    last_name: profile.lastName,
    avatar: profile.avatar,
    background: profile.background,
    bio: profile.bio,
    error: ""
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    const handleUpdateSuccess = () => {
      const cookies = new Cookies();
      socket.emit("userConnectionLoadCookie", cookies.get("user"));
    };
    socket.on("updateSuccess", handleUpdateSuccess);
    return () => {
      socket.removeListener("updateSuccess", handleUpdateSuccess);
    };
  }, [socket]);

  const handleEventForm = event => {
    setEditData({ ...editData, [event.target.id]: event.target.value });
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
                  console.log("validate and show here");
                }}
              ></CustomizedSnackbars>
            )}
            <div id="formWrap">
              <TextField
                id="first_name"
                value={editData.first_name}
                onChange={handleEventForm}
                label="First name"
                margin="normal"
              />
              <TextField
                id="last_name"
                value={editData.last_name}
                onChange={handleEventForm}
                label="Last name"
                margin="normal"
              />
              <TextField
                id="avatar"
                value={editData.avatar}
                onChange={handleEventForm}
                label="Avatar URL"
                margin="normal"
              />
              <TextField
                id="background"
                value={editData.background}
                onChange={handleEventForm}
                label="Background URL"
                margin="normal"
              />
              <TextField
                id="bio"
                value={editData.bio}
                onChange={handleEventForm}
                label="Bio"
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
                socket.emit("profileUpdate", {
                  id: profile.id,
                  first_name: endSpaceRemover(editData.first_name),
                  last_name: endSpaceRemover(editData.last_name),
                  avatar: endSpaceRemover(editData.avatar),
                  background: endSpaceRemover(editData.background),
                  bio: endSpaceRemover(editData.bio)
                });
              }
              handleClose();
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

const validateSubmission = editData => {
  if (!endSpaceRemover(editData.first_name)) {
    return "First name cannot be empty!";
  } else {
    return "";
  }
};
