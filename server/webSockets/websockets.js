const socketio = require("socket.io");

module.exports = server => {
  const io = socketio(server);
  console.log("Websocket Ready to connect!");
  io.on("connection", client => {
    console.log("Connected!!");
    client.on("chatMsg", data => {
      console.log(`Nuevo Mensaje -> ${data}`);
      client.broadcast.emit("chatMsg", data);
    });
  });
};

