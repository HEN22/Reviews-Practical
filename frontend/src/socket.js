import { io } from "socket.io-client";

export const Socket = io("http://localhost:3000?path=review");
Socket.on("connect", (socket) => {
  console.log("connected socket connection status::", socket);
});
// eslint-disable-next-line no-unused-vars
Socket.on("connect_error", (err) => {
  console.log("socket connection error", err);
});

Socket.on("disconnect", () => {
  console.log("Disconnected socket connection status: ", Socket.connected);
});
