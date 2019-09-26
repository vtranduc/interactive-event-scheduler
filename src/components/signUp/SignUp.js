import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import Cookies from "universal-cookie";
import useKeyPress from "../../helpers/useKeyPress";
import endSpaceRemover from "../../helpers/endSpaceRemover";
import CustomizedSnackbars from "../customizedSnackbars/CustomizedSnackbars";
import "./SignUp.css";

const useStylesPaper = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "1em"
  }
}));

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  registerBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
}));

export default function SignUp({ socket, setProfile }) {
  const classesPaper = useStylesPaper();
  const classes = useStyles();

  const [fieldVals, setFieldVals] = useState({
    trigger: false,
    firstName: "",
    lastName: "",
    email: "",
    pass1: "",
    pass2: ""
  });
  const [errMsg, setErrMsg] = useState("");

  const handleInput = event => {
    switch (event.target.id) {
      case "filled-first-name":
        setFieldVals({ ...fieldVals, firstName: event.target.value });
        break;
      case "filled-last-name":
        setFieldVals({ ...fieldVals, lastName: event.target.value });
        break;
      case "filled-email-input":
        setFieldVals({ ...fieldVals, email: event.target.value });
        break;
      case "filled-password-input-1":
        setFieldVals({ ...fieldVals, pass1: event.target.value });
        break;
      case "filled-password-input-2":
        setFieldVals({ ...fieldVals, pass2: event.target.value });
        break;
    }
  };

  const Enter = useKeyPress("Enter");

  const handleSubmission = () => {
    setFieldVals({
      ...fieldVals,
      trigger: true,
      firstName: endSpaceRemover(fieldVals.firstName),
      lastName: endSpaceRemover(fieldVals.lastName),
      email: endSpaceRemover(fieldVals.email)
    });
  };

  useEffect(() => {
    const handleSignUpResponse = data => {
      if (data) {
        const cookies = new Cookies();
        cookies.set("user", data.cookie, { path: "/" });
        setProfile(data.profile);
      } else {
        setErrMsg("The account with this email already exists");
        setFieldVals(oldVals => {
          return { ...oldVals, email: "" };
        });
      }
    };
    socket.on("signUpResponse", handleSignUpResponse);
    return () => {
      socket.removeListener("signUpResponse", handleSignUpResponse);
    };
  }, []);

  useEffect(() => {
    if (Enter) {
      if (fieldActive()) {
        handleSubmission();
      } else {
        document.getElementById("filled-first-name").focus();
      }
    }
  }, [Enter]);

  useEffect(() => {
    if (fieldVals.trigger) {
      setErrMsg("");
      const errorMsg = filedValsErrorDetector(fieldVals, setFieldVals);
      if (errorMsg) {
        setErrMsg(errorMsg);
      } else {
        socket.emit("userConnectionSignUp", fieldVals);
      }
      setFieldVals({ ...fieldVals, trigger: false, pass1: "", pass2: "" });
    }
  }, [fieldVals.trigger]);

  return (
    <Paper className={classesPaper.root}>
      {errMsg && (
        <CustomizedSnackbars
          variant={"error"}
          message={errMsg}
          onClose={() => {
            setErrMsg("");
          }}
        ></CustomizedSnackbars>
      )}
      <div id="paperContent">
        <Typography variant="h5" component="h3">
          Sign up
        </Typography>
        <Typography component="p">
          Sign up to join and create event and more!
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="filled-first-name"
            label="First Name"
            className={classes.textField}
            value={fieldVals.firstName}
            onChange={handleInput}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-last-name"
            label="Last Name"
            className={classes.textField}
            value={fieldVals.lastName}
            onChange={handleInput}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-email-input"
            label="Email"
            className={classes.textField}
            name="email"
            autoComplete="email"
            margin="normal"
            variant="filled"
            value={fieldVals.email}
            onChange={handleInput}
          />
          <TextField
            id="filled-password-input-1"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            value={fieldVals.pass1}
            onChange={handleInput}
          />
          <TextField
            id="filled-password-input-2"
            label="Confirm password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            value={fieldVals.pass2}
            onChange={handleInput}
          />
          <div className={`${classes.textField} ${classes.registerBtn}`}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmission}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
}

const fieldActive = () => {
  return (
    document.activeElement === document.getElementById("filled-first-name") ||
    document.activeElement === document.getElementById("filled-last-name") ||
    document.activeElement === document.getElementById("filled-email-input") ||
    document.activeElement ===
      document.getElementById("filled-password-input-1") ||
    document.activeElement ===
      document.getElementById("filled-password-input-2")
  );
};

const filedValsErrorDetector = (fieldVals, setFieldVals) => {
  if (!endSpaceRemover(fieldVals.firstName)) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "The first name cannot be empty!";
  } else if (!endSpaceRemover(fieldVals.lastName)) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "The last name cannot be empty!";
  } else if (!endSpaceRemover(fieldVals.email)) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "The email cannot be empty!";
  } else if (
    endSpaceRemover(fieldVals.email).includes(" ") ||
    !fieldVals.email.includes("@")
  ) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "The email is invalid!";
  } else if (!fieldVals.pass1 || !fieldVals.pass2) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "Password must not be empty";
  } else if (fieldVals.pass1 !== fieldVals.pass2) {
    setFieldVals({ ...fieldVals, pass1: "", pass2: "" });
    return "Password does not match!";
  } else {
    return "";
  }
};
