import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { TextField, Button, Paper } from "@material-ui/core";
import useKeyPress from "../../helpers/useKeyPress";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../customizedSnackbars/CustomizedSnackbars";
import "./Login.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function Login({ setProfile, socket }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const classes = useStyles();
  useEffect(() => {
    // console.log("LOADING UP LOGIN PAGE!");
    const handleUserConnectRetrieveProfile = function(data) {
      if (data.mismatch === "email") {
        // alert("Email does not exist in our records!");
        setErrMsg("Email does not exist in our records!");
        setLoginInfo({ ...loginInfo, email: "" });
      } else if (data.mismatch === "password") {
        // alert("Password is incorrect!");
        setErrMsg("Password is incorrect!");
      } else {
        const cookies = new Cookies();
        cookies.set("user", data.cookie, {
          path: "/"
        });
        setProfile(data.profile);
      }
    };
    socket.on("userConnectRetrieveProfile", handleUserConnectRetrieveProfile);
    return () => {
      socket.removeListener(
        "userConnectRetrieveProfile",
        handleUserConnectRetrieveProfile
      );
    };
  }, []);
  const handleInput = function(event) {
    switch (event.target.name) {
      case "email":
        setLoginInfo({ ...loginInfo, email: event.target.value });
        break;
      case "password":
        setLoginInfo({ ...loginInfo, password: event.target.value });
        break;
    }
  };
  const handleSubmission = function(loginInfo, setLoginInfo, socket) {
    setErrMsg("");
    if (loginInfo.email && loginInfo.password) {
      socket.emit("userConnectionLogin", loginInfo);
      setLoginInfo({ ...loginInfo, password: "" });
    } else {
      // alert("Email and password must not be empty!");
      setErrMsg("Email and password must not be empty!");
    }
  };
  const Enter = useKeyPress("Enter");
  useEffect(() => {
    if (Enter) {
      if (
        document.activeElement === document.getElementById("emailLogin") ||
        document.activeElement === document.getElementById("passwordLogin")
      ) {
        handleSubmission(loginInfo, setLoginInfo, socket);
      } else {
        document.getElementById("emailLogin").focus();
      }
    }
  }, [Enter]);
  return (
    <Paper className={classes.root}>
      {errMsg && (
        <CustomizedSnackbars
          variant={"error"}
          message={errMsg}
          onClose={() => {
            setErrMsg("");
          }}
        ></CustomizedSnackbars>
      )}
      <div className="paperWrapperLogin">
        <h3>Log in to schedule</h3>
        <TextField
          label="Email"
          id="emailLogin"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="filled"
          value={loginInfo.email}
          onChange={handleInput}
        />
        <TextField
          label="Password"
          id="passwordLogin"
          type="password"
          name="password"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
          value={loginInfo.password}
          onChange={handleInput}
        />
        <div className="buttonLogin">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmission(loginInfo, setLoginInfo, socket);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </Paper>
  );
}
