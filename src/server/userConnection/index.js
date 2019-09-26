const { cookieEncrypt, cookieDecrypt } = require("./cookieEncryptDecrypt");
const {
  retrieveProfileByEmail,
  registerNewUser
} = require("../../../db/queries/queries");

const userConnection = function(socket, io, pool, bcrypt, avatarDefault) {
  socket.on("userConnectionSignUp", data => {
    retrieveProfileByEmail(data.email, pool).then(res1 => {
      if (res1.length) {
        io.to(socket.id).emit("signUpResponse", null);
      } else {
        registerNewUser(
          data.email,
          data.firstName,
          data.lastName,
          bcrypt.hashSync(data.pass1, 10),
          pool
        ).then(res2 => {
          io.to(socket.id).emit("signUpResponse", {
            cookie: cookieEncrypt(data.email),
            profile: {
              id: res2,
              firstName: data.firstName,
              lastName: data.lastName,
              avatar: avatarDefault,
              email: data.email,
              bio: ""
            }
          });
        });
      }
    });
  });

  socket.on("userConnectionLoadCookie", data => {
    const email = cookieDecrypt(data);
    if (email) {
      retrieveProfileByEmail(email, pool).then(res => {
        io.to(socket.id).emit("cookieCatch", {
          profile: {
            id: res[0].id,
            firstName: res[0].first_name,
            lastName: res[0].last_name,
            avatar: res[0].avatar ? res[0].avatar : avatarDefault,
            email: data.email,
            bio: res[0].bio ? res[0].bio : ""
          }
        });
      });
    } else {
      io.to(socket.id).emit("cookieCatch", null);
    }
  });

  socket.on("userConnectionLogin", data => {
    retrieveProfileByEmail(data.email, pool)
      .then(res => {
        if (res.length) {
          if (bcrypt.compareSync(data.password, res[0].pass)) {
            io.to(socket.id).emit("userConnectRetrieveProfile", {
              cookie: cookieEncrypt(data.email),
              mismatch: null,
              profile: {
                id: res[0].id,
                firstName: res[0].first_name,
                lastName: res[0].last_name,
                avatar: res[0].avatar ? res[0].avatar : avatarDefault,
                email: data.email,
                bio: res[0].bio ? res[0].bio : ""
              }
            });
          } else {
            io.to(socket.id).emit("userConnectRetrieveProfile", {
              mismatch: "password"
            });
          }
        } else {
          io.to(socket.id).emit("userConnectRetrieveProfile", {
            mismatch: "email"
          });
        }
      })
      .catch(err => {
        console.log("Failed to retrieve user data: ", err);
      });
  });
};

module.exports = userConnection;
