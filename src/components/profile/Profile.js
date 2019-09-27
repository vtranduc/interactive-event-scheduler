import React, { useEffect, useState } from "react";
import FullWidthBtnGroup from "../fullWidthBtnGroup/FullWidthBtnGroup";
// import Paper from "@material-ui/core/Paper";
import EventShow from "../eventShow/EventShow";
import "./Profile.css";
import addLineBreaks from "../../helpers/addLineBreaks";
import { getLastItemOfPath, isUserPage } from "../../helpers/getLastItemOfPath";
import PopoverProfile from "./PopoverProfile";

const UPCOMING = "UPCOMING";
const HAPPENING = "HAPPENING";
const PAST = "PAST";

const dateFilter = {
  UPCOMING: e => new Date(e.start) > new Date().getTime(),
  PAST: e => new Date(e.end) < new Date().getTime(),
  HAPPENING: e =>
    new Date(e.start) < new Date().getTime() &&
    new Date(e.end) > new Date().getTime()
};

const feedWithInPx = 650;

export default function Profile({
  profile,
  setProfile,
  match,
  socket,
  routeDirector,
  setRouteDirector
}) {
  const [feeds, setFeeds] = useState(null);
  const [feedMode, setFeedMode] = useState(UPCOMING);
  const [currentProfile, setCurrentProfile] = useState(match.params.username);

  const btnSelections = [
    {
      key: UPCOMING,
      text: "Upcoming",
      onClick: () => {
        setFeedMode(UPCOMING);
      }
    },
    {
      key: PAST,
      text: "Past",
      onClick: () => {
        setFeedMode(PAST);
      }
    },
    {
      key: HAPPENING,
      text: "Happening",
      onClick: () => {
        setFeedMode(HAPPENING);
      }
    }
  ];

  useEffect(() => {
    // console.log("COMPARE: ", match.params.username, profile.id);
    socket.emit("profileEventRetrieve", {
      userId: match.params.username
    });
    // setCurrentProfile(match.params.username);
    const handleProfileData = data => {
      setFeeds(data);
      document.getElementById("profile").scrollIntoView();
    };
    socket.on("profileData", handleProfileData);
    return () => {
      socket.removeListener("profileData", handleProfileData);
    };
  }, [profile]);

  useEffect(() => {
    if (routeDirector && isUserPage(routeDirector)) {
      socket.emit("profileEventRetrieve", {
        userId: getLastItemOfPath(routeDirector)
      });
      setCurrentProfile(getLastItemOfPath(routeDirector));
    }
  }, [routeDirector]);

  return (
    <div className="paper">
      {feeds ? (
        <div className="paperFiller">
          <div
            id="profile"
            style={{
              backgroundImage: `url("${feeds.userInfo.background}")`
            }}
          >
            <br></br>
            <div id="profile-img-wrap">
              <img src={feeds.userInfo.avatar} id="profile-img" />
            </div>
            <div id="nameWrap">
              <h2 id="fullName">
                {feeds.userInfo.first_name} {feeds.userInfo.last_name}
              </h2>
            </div>
            {currentProfile == profile.id && (
              <div id="editProfile">
                <PopoverProfile
                  btnText="Edit"
                  btnColor="#ffeb3b"
                  btnHoverColor="#fbc02d"
                  btnWidth={Math.floor(feedWithInPx * 0.2)}
                  btnHeight={35}
                  socket={socket}
                  profile={profile}
                  setProfile={setProfile}
                ></PopoverProfile>
              </div>
            )}
            <div id="rofile-about-wrap">
              <div id="profile-about">{addLineBreaks(feeds.userInfo.bio)}</div>
            </div>
          </div>
          <div style={{ width: `${feedWithInPx}px`, marginBottom: "15px" }}>
            <FullWidthBtnGroup
              btns={btnSelections}
              color="#4dd0e1"
              hoverColor="#00acc1"
              selectedkey={feedMode}
            ></FullWidthBtnGroup>
          </div>
          {feeds.feeds.filter(dateFilter[feedMode]).map(e => (
            <EventShow
              key={`joined_event_${e.id}`}
              event={e}
              id={profile.id}
              socket={socket}
              width={feedWithInPx}
              setRouteDirector={setRouteDirector}
            ></EventShow>
          ))}
        </div>
      ) : (
        <h3>Retrieving data from the server</h3>
      )}
    </div>
  );
}
