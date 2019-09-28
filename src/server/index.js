const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3001;
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fundthrough",
  password: 123
});
const bcrypt = require("bcrypt");
const userConnection = require("./userConnection/index");
const eventDataAccess = require("./eventDataAccess/index");
const profileDataAccess = require("./profile/index");

// const online = {};
const avatarDefault =
  "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg";
const backgroundDefault = `https://images.alphacoders.com/567/567999.jpg`;

server.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});

io.on("connection", socket => {
  console.log("A user has been connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
  });
  userConnection(socket, io, pool, bcrypt, avatarDefault, backgroundDefault);
  eventDataAccess(socket, io, pool, avatarDefault, backgroundDefault);
  profileDataAccess(socket, io, pool, avatarDefault, backgroundDefault);
});
