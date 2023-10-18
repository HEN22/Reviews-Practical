import dotenv from 'dotenv';
dotenv.config();

const config = {
  db: {
    db_string: process.env.DB_STRING,
  },
};

export default config;
