const {
  retrieveJoinedEvents,
  addEvent,
  discoverEvents,
  leaveEvent,
  joinEvent,
  retrieveEditableEventData,
  editEvent,
  searchEvent
} = require("../../../db/queries/queries");

const eventDataAccess = function(
  socket,
  io,
  pool,
  avatarDefault,
  backgroundDefault
) {
  socket.on("eventRetrieve", data => {
    retrieveJoinedEvents(data.userId, pool).then(res => {
      io.to(socket.id).emit("loadHomeData", {
        modeSwitch: data.modeSwitch,
        feeds: res.map(e => {
          return {
            id: e.event_id,
            name: e.name,
            picture: e.picture,
            description: e.description,
            location: e.location,
            start: e.start_time,
            end: e.end_time,
            createdDate: e.created_time,
            admin: e.admin,
            participants: e.participants.map(e => {
              return {
                ...e,
                avatar: e.avatar ? e.avatar : avatarDefault,
                background: e.background ? e.background : backgroundDefault
              };
            }),
            creator: {
              id: e.creator_id,
              firstName: e.first_name,
              lastName: e.last_name,
              avatar: e.avatar ? e.avatar : avatarDefault,
              background: e.background ? e.background : backgroundDefault,
              bio: e.bio
            }
          };
        })
      });
    });
  });

  socket.on("createAnEvent", data => {
    addEvent(data, pool).then(() => {
      io.to(socket.id).emit("eventCreateResponse");
    });
  });

  socket.on("discoverEvents", id => {
    discoverEvents(id, pool).then(res => {
      io.to(socket.id).emit(
        "discoverEvents",
        res.map(e => {
          return {
            id: e.id,
            name: e.name,
            picture: e.picture,
            description: e.description,
            location: e.location,
            start: e.start_time,
            end: e.end_time,
            createdDate: e.created_time,
            admin: false,
            participants: e.participants.map(e => {
              return {
                ...e,
                avatar: e.avatar ? e.avatar : avatarDefault,
                background: e.background ? e.background : backgroundDefault
              };
            }),
            creator: {
              id: e.creator_id,
              firstName: e.first_name,
              lastName: e.last_name,
              avatar: e.avatar ? e.avatar : avatarDefault,
              background: e.background ? e.background : backgroundDefault,
              bio: e.bio
            }
          };
        })
      );
    });
  });

  socket.on("leaveEvent", data => {
    leaveEvent(data, pool).then(() => {
      io.to(socket.id).emit("updateFeeds");
    });
  });

  socket.on("joinEvent", data => {
    joinEvent(data, pool).then(() => {
      io.to(socket.id).emit("updateFeeds");
    });
  });

  socket.on("retrieveEditableEventData", eventId => {
    retrieveEditableEventData(eventId, pool).then(res => {
      io.to(socket.id).emit(`receiveEditableData-${eventId}`, res);
    });
  });

  socket.on("editEvent", data => {
    editEvent(data, pool).then(() => {
      io.to(socket.id).emit("updateFeeds");
      io.to(socket.id).emit(`editResponse-${data.id}`);
    });
  });

  socket.on("searchEvent", data => {
    searchEvent(data.search, pool).then(res => {
      io.to(socket.id).emit("searchedEvent", {
        searchResult: res.map(e => {
          return {
            id: e.id,
            name: e.name,
            picture: e.picture,
            description: e.description,
            location: e.location,
            start: e.start_time,
            end: e.end_time,
            createdDate: e.created_time,
            admin: false,
            participants: e.participants.map(e => {
              return {
                ...e,
                avatar: e.avatar ? e.avatar : avatarDefault,
                background: e.background ? e.background : backgroundDefault
              };
            }),
            creator: {
              id: e.creator_id,
              firstName: e.first_name,
              lastName: e.last_name,
              avatar: e.avatar ? e.avatar : avatarDefault,
              background: e.background ? e.background : backgroundDefault,
              bio: e.bio
            }
          };
        })
      });
    });
  });
};

module.exports = eventDataAccess;
