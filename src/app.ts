import express from 'express';
import {instanceMongodb} from "./database/init.mongodb";
import {is404Handler, logErrorMiddleware, returnError} from "./middleware/errorHandler";
import {router} from "./routes/route";
import dotenv from 'dotenv'; 
dotenv.config();

export const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/', router);

// init db
instanceMongodb.connect();

// handle errors
app.use(is404Handler);
app.use(logErrorMiddleware);
app.use(returnError);
