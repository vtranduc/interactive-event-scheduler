import React, { useState, useEffect } from "react";
import "./App.css";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import { withRouter, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import SignUp from "./components/signUp/SignUp";
import Test from "./components/test/Test";

const serverPORT = 3001;
const logo =
  "https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png";
// const navBarHeight = "7vh";

function App() {
  const [profile, setProfile] = useState(null);
  const [socket, setSocket] = useState(null);
  const [routeDirector, setRouteDirector] = useState(null);
  const [initializingState, setInitializingState] = useState(false);
  // const [searchStr, setSearchStr] = useState("");
  let handleCookieCatch;
  useEffect(() => {
    console.log("initializing the application...");
    setSocket(io(`:${serverPORT}`));
  }, []);
  useEffect(() => {
    if (socket) {
      const cookies = new Cookies();
      if (cookies.get("user")) {
        socket.emit("userConnectionLoadCookie", cookies.get("user"));
      } else {
        setInitializingState(true);
      }
      handleCookieCatch = function(data) {
        console.log("received", data);
        if (data) {
          setProfile(() => data.profile);
        } else {
          cookies.remove("user");
        }
        setInitializingState(true);
      };
      socket.on("cookieCatch", handleCookieCatch);
    }
    return () => {
      if (socket) {
        if (handleCookieCatch) {
          socket.removeListener("cookieCatch", handleCookieCatch);
        }
      }
    };
  }, [socket]);
  const NavBarWithRouter = withRouter(props => (
    <NavBar
      profile={profile}
      setProfile={setProfile}
      routeDirector={routeDirector}
      setRouteDirector={setRouteDirector}
      logo={logo}
      // socket={socket}
      // searchStr={searchStr}
      // setSearchStr={setSearchStr}
      // navBarHeight={navBarHeight}
      {...props}
    ></NavBar>
  ));
  return (
    <div>
      {initializingState ? (
        <Router>
          {routeDirector && <Redirect to={routeDirector}></Redirect>}
          <NavBarWithRouter />
          <div className="overlayApp">
            {/* <div className="overlayAssistApp"> */}
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  if (!profile) {
                    setRouteDirector("/login");
                  }
                  return (
                    <div className="overlayAssistScroll">
                      {profile ? (
                        <Home
                          socket={socket}
                          profile={profile}
                          setRouteDirector={setRouteDirector}
                        ></Home>
                      ) : (
                        <h3>Oops you are logged out</h3>
                      )}
                    </div>
                  );
                }}
              ></Route>
              <Route
                path="/user/:username"
                exact
                render={props => {
                  // setRouteDirector("/yaminoma");
                  // console.log("GO HERE PLEASSE");
                  if (!profile) {
                    setRouteDirector("/login");
                  }
                  return (
                    <div className="overlayApp">
                      {profile ? (
                        <Profile
                          profile={profile}
                          setProfile={setProfile}
                          socket={socket}
                          routeDirector={routeDirector}
                          setRouteDirector={setRouteDirector}
                          {...props}
                        ></Profile>
                      ) : (
                        <h3>You must be logged in. Redirecting...</h3>
                      )}
                    </div>
                  );
                }}
              ></Route>
              <Route
                path="/test"
                exact
                render={() => {
                  return (
                    <Test
                      avatarPath={
                        "https://66.media.tumblr.com/8777395fcf9833f0c67be1b29a1dff19/tumblr_pegs5ypAHb1wjwbano5_250.png"
                      }
                    ></Test>
                  );
                }}
              ></Route>
              <Route
                path="/signup"
                exact
                render={() => {
                  if (profile) {
                    setRouteDirector("/");
                  }
                  return (
                    <div className="overlayAssistApp">
                      {profile ? (
                        <h3>You are logged in. FORBIDDEN</h3>
                      ) : (
                        <SignUp
                          socket={socket}
                          setProfile={setProfile}
                        ></SignUp>
                      )}
                    </div>
                  );
                }}
              ></Route>
              <Route
                path="/login"
                exact
                render={() => {
                  if (profile) {
                    setRouteDirector("/");
                  }
                  return (
                    <div className="overlayAssistApp">
                      {profile ? (
                        <h3>you are already logged in. Redirect</h3>
                      ) : (
                        <Login setProfile={setProfile} socket={socket}></Login>
                      )}
                    </div>
                  );
                }}
              ></Route>
              <Route
                path="/profile"
                exact
                render={() => {
                  return <Profile className="overlayAssistApp"></Profile>;
                }}
              ></Route>
            </Switch>
            {/* </div> */}
          </div>
        </Router>
      ) : (
        <h2>Waiting for connection to the server...</h2>
      )}
    </div>
  );
}

export default App;
