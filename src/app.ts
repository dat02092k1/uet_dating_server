import express from 'express';
import {instanceMongodb} from "./database/init.mongodb";
import {is404Handler, logErrorMiddleware, returnError} from "./middleware/errorHandler";
import {router} from "./routes/route";
import dotenv from 'dotenv';
import {isRedisConnected} from "./api_services/redis";
dotenv.config();

export const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/', router);

// init db
instanceMongodb.connect();

// redis
if (isRedisConnected()) {
    console.log('Redis client is connected to the Redis server');
} else {
    console.log('Redis client is not connected to the Redis server');
}
// handle errors
app.use(is404Handler);
app.use(logErrorMiddleware);
app.use(returnError);
