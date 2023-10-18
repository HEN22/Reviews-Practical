import { io } from "socket.io-client";

export const Socket = io(
  "https://6556-49-36-68-43.ngrok-free.app?path=review",
  {
    // extraHeaders: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // transports: ["polling"],
  }
);
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
