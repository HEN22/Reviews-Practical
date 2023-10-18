import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './components/indexRoute.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors('*'));
app.use('/api/v1', indexRouter);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status).send({
    error: {
      status: err.status || 500,
      msg: err.message || 'Internal Server Error',
      data: err.stack,
    },
  });
});

export default app;
