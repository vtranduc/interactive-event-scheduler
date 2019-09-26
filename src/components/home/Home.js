import React, { useEffect, useState } from "react";
import EventShow from "./EventShow";
import "./Home.css";
import FullWidthBtnGroup from "../fullWidthBtnGroup/FullWidthBtnGroup";
import EventCreate from "./EventCreate";
import SearchBox from "./SearchBox";
import endSpaceRemover from "../../helpers/endSpaceRemover";

const ALL = "ALL";
const CREATE = "CREATE";
const UPCOMING = "UPCOMING";
const HAPPENING = "HAPPENING";
const PAST = "PAST";
const DISCOVER = "DISCOVER";
const SEARCH = "SEARCH";

export default function Home({ profile, socket }) {
  const [feeds, setFeeds] = useState(null);
  const [discovery, setDiscovery] = useState(null);
  const [filteredFeeds, setFilteredFeeds] = useState(null);
  const [feedMode, setFeedMode] = useState(null);
  const [searchStr, setSearchStr] = useState("");
  const [searchedFeeds, setSearchedFeeds] = useState([]);
  const [createData, setCreateData] = useState({
    trigger: false,
    // success: false,
    error: "",
    warning: "",
    name: "",
    location: "",
    description: "",
    picture: "",
    start: new Date(),
    end: new Date()
  });
  const btnSelections = [
    {
      key: CREATE,
      text: "Create",
      onClick: () => {
        setFeedMode(CREATE);
      }
    },
    {
      key: ALL,
      text: "All",
      onClick: () => {
        setFeedMode(ALL);
      }
    },
    {
      key: HAPPENING,
      text: "Happening",
      onClick: () => {
        setFeedMode(HAPPENING);
      }
    },
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
      key: SEARCH,
      text: "SEARCH",
      onClick: () => {
        setFeedMode(SEARCH);
      }
    },
    {
      key: DISCOVER,
      text: "Discover",
      onClick: () => {
        setFeedMode(DISCOVER);
      }
    }
  ];
  useEffect(() => {
    console.log("loading up home");
    socket.emit("eventRetrieve", { userId: profile.id, modeSwitch: UPCOMING });
    const handleLoadHomeData = data => {
      console.log("data received is: ", data);
      setFeeds(data.feeds);
      if (data.modeSwitch) {
        setFeedMode(data.modeSwitch);
      }
    };
    socket.on("loadHomeData", handleLoadHomeData);
    const handleEventCreateResponse = () => {
      setCreateData({
        trigger: false,
        // success: false,
        error: "",
        warning: "",
        name: "",
        location: "",
        description: "",
        picture: "",
        start: new Date(),
        end: new Date()
      });
      socket.emit("eventRetrieve", {
        userId: profile.id,
        modeSwitch: UPCOMING
      });
    };
    socket.on("eventCreateResponse", handleEventCreateResponse);
    const handleDiscoverEvents = data => {
      console.log("discovered!: ", data);
      setDiscovery(data);
    };
    socket.on("discoverEvents", handleDiscoverEvents);
    const handleUpdateFeeds = () => {
      socket.emit("eventRetrieve", { userId: profile.id, modeSwitch: null });
    };
    socket.on("updateFeeds", handleUpdateFeeds);
    const handleSearchedEvents = data => {
      console.log("getting my data HERE", data);
      setSearchedFeeds(data.searchResult);
    };
    socket.on("searchedEvent", handleSearchedEvents);
    return () => {
      socket.removeListener("loadHomeData", handleLoadHomeData);
      socket.removeListener("eventCreateResponse", handleEventCreateResponse);
      socket.removeListener("discoverEvents", handleDiscoverEvents);
      socket.removeListener("updateFeeds", handleUpdateFeeds);
      socket.removeListener("searchedEvent", handleSearchedEvents);
    };
  }, [profile, socket]);

  useEffect(() => {
    if (feeds && socket) {
      const today = new Date();
      switch (feedMode) {
        case ALL:
          setFilteredFeeds(feeds);
          break;
        case CREATE:
          break;
        case HAPPENING:
          setFilteredFeeds(
            feeds.filter(
              e =>
                new Date(e.start) < today.getTime() &&
                new Date(e.end) > today.getTime()
            )
          );
          break;
        case UPCOMING:
          setFilteredFeeds(
            feeds.filter(e => new Date(e.start) > today.getTime())
          );
          break;
        case PAST:
          setFilteredFeeds(
            feeds.filter(e => new Date(e.end) < today.getTime())
          );
          break;
        case DISCOVER:
          // console.log("DISCOVER shown");
          socket.emit("discoverEvents", profile.id);
          break;
        case SEARCH:
          break;
        default:
          break;
      }
    }
  }, [feedMode, feeds, socket]);

  useEffect(() => {
    if (createData.trigger) {
      socket.emit("createAnEvent", {
        creatorId: profile.id,
        name: createData.name,
        picture: createData.picture,
        description: createData.description,
        location: createData.location,
        startTime: createData.start,
        endTime: createData.end
      });
      setCreateData({ ...createData, trigger: false });
    }
  }, [createData.trigger]);

  // useEffect(() => {
  //   console.log("real time search: ", searchStr);
  // }, [searchStr]);

  const handleSearch = () => {
    console.log("sending up: ", searchStr);
    const str = endSpaceRemover(searchStr);
    if (str) {
      socket.emit("searchEvent", { search: str });
    }
  };

  return (
    <div className="homeParent">
      {filteredFeeds ? (
        <div className="homeChildWrapper">
          <div id="eventCategoryBtns">
            <FullWidthBtnGroup
              btns={btnSelections}
              color="#4dd0e1"
              hoverColor="#00acc1"
              selectedkey={feedMode}
            ></FullWidthBtnGroup>
          </div>
          {(feedMode === ALL ||
            feedMode === HAPPENING ||
            feedMode === UPCOMING ||
            feedMode === PAST) && (
            <div className="homeChild">
              {filteredFeeds.map(e => (
                <EventShow
                  key={`joined_event_${e.id}`}
                  event={e}
                  id={profile.id}
                  socket={socket}
                ></EventShow>
              ))}
            </div>
          )}
          {feedMode === CREATE && (
            <div className="homeChild">
              <EventCreate
                createData={createData}
                setCreateData={setCreateData}
              ></EventCreate>
            </div>
          )}
          {feedMode === DISCOVER && discovery && (
            <div className="homeChild">
              {discovery.map(e => (
                <EventShow
                  key={`discover_event_${e.id}`}
                  event={e}
                  id={profile.id}
                  socket={socket}
                ></EventShow>
              ))}
            </div>
          )}
          {feedMode === SEARCH && (
            <>
              <div className="homeSearched">
                <div className="searchBoxWrapper">
                  <div className="searchBoxWrapperAssist">
                    <SearchBox
                      searchStr={searchStr}
                      setSearchStr={setSearchStr}
                      onSearch={handleSearch}
                    ></SearchBox>
                  </div>
                </div>
                <div className="searchResult">
                  {searchedFeeds.map((e, i) => (
                    <EventShow
                      key={`searched_event_${e.id}`}
                      event={e}
                      id={profile.id}
                      socket={socket}
                      marginTop={i === 0 ? "60px" : null}
                    ></EventShow>
                  ))}
                </div>
                {/* </div> */}
              </div>
            </>
          )}
        </div>
      ) : (
        <h2>Retrieving data...</h2>
      )}
    </div>
  );
}

// {
//   id: e.event_id,
//   name: e.name,
//   picture: e.picture,
//   description: e.description,
//   location: e.location,
//   start: e.start_time,
//   end: e.end_time,
//   createdDate: e.created_time,
//   joinedData: e.joined_time,
//   admin: e.admin,
//   participants: e.participants,
//   creator: {
//     id: e.creator_id,
//     firstName: e.first_name,
//     lastName: e.last_name,
//     avatar: e.avatar ? e.avatar : avatarDefault,
//     background: e.background ? e.background : backgroundDefault,
//     bio: e.bio
//   }
