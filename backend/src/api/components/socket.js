import { io } from '../bin/www.js';

export const socketConnection = async (socket) => {
  socket.join('reviews');
};

export const sendSocketData = async (data) => {
  io.to('reviews').emit('reviews', data);
};
