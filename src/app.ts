import express from 'express';
import {instanceMongodb} from "./database/init.mongodb";

export const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// init db
instanceMongodb.connect();