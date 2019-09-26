const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
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

// const online = {};
const avatarDefault =
  "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg";
const backgroundDefault = `https://images4.alphacoders.com/692/692474.jpg`;

server.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});

io.on("connection", socket => {
  console.log("A user has been connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
  });
  userConnection(socket, io, pool, bcrypt, avatarDefault);
  eventDataAccess(socket, io, pool, avatarDefault, backgroundDefault);
});
