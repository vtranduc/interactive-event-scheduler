const {
  // retrieveProfileByEmail,
  // registerNewUser,
  retrieveJoinedEvents,
  retrieveProfileById,
  updateProfile
  // addEvent,
  // discoverEvents,
  // leaveEvent,
  // joinEvent,
  // retrieveEditableEventData,
  // editEvent,
  // searchEvent
} = require("../../../db/queries/queries");

const profileDataAccess = (
  socket,
  io,
  pool,
  avatarDefault,
  backgroundDefault
) => {
  socket.on("profileEventRetrieve", data => {
    Promise.all([
      retrieveJoinedEvents(data.userId, pool),
      retrieveProfileById(data.userId, pool)
    ]).then(res => {
      io.to(socket.id).emit("profileData", {
        // modeSwitch: data.modeSwitch,
        userInfo: {
          ...res[1],
          avatar: res[1].avatar ? res[1].avatar : avatarDefault,
          background: res[1].background ? res[1].background : backgroundDefault
        },
        feeds: res[0].map(e => {
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
            participants: e.participants,
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

  socket.on("profileUpdate", data => {
    // console.log("update profile to be this", data);
    updateProfile(data, pool).then(() => {
      // console.log("I guess it is successful?");
      io.to(socket.id).emit("updateSuccess");
    });
  });
};

module.exports = profileDataAccess;
