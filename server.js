const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on("connection", socket => {
  console.log(`User ${socket.id} connected`);

  socket.on("gotmedia", msg => {
    socket.broadcast.emit("gotmedia", msg);
  });

  socket.on("end", msg => {
    socket.broadcast.emit("end", msg);
  });

  socket.on("disconnect", () => console.log(`User ${socket.id} disconnected`));
});
