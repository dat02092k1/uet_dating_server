"use strict";

const mongoose = require("mongoose");
import {cfg} from '../config/config.mongodb';
const { db: {host, name, port}} = cfg;

const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
    }

    // connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50
        })
            .then(() => console.log("DB connected"))
            .catch((err: any) => console.log('Error connect', err));
    }
}

export const instanceMongodb = new Database();