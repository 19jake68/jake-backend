const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
var fs = require('fs');

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);
require("./routes/index")(app, io, fs);

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
