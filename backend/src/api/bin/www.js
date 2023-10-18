/**
 * Module dependencies.
 */
import app from '../app.js';
import http from 'http';
import { Server } from 'socket.io';
import { socketConnection } from '../components/socket.js';

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Create socket connection.
 */
export const io = new Server(server, {
  cors: '*',
});

io.on('connection', (socket) => {
  console.log('Socket connected successfully !');
  socketConnection(socket);
  socket.on('disconnect', () => {
    console.log('Socket disconnected !');
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
}
