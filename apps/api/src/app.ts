
import express, { Express } from 'express';
import router from './routers/router';

// express app
const app: Express = express()

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use(router);

export default app;