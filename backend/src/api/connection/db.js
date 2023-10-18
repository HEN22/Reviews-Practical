import mongoose from 'mongoose';
import process from 'process';
import config from '../config/config.js';

mongoose.connect(config.db.db_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connection open to master DB');
});

db.on('error', (err) => {
  console.log(`Mongoose connection error for master DB: ${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose connection disconnected for master DB');
});

db.on('reconnected', () => {
  console.log('Mongoose connection reconnected for master DB');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close();
});

export default db;
