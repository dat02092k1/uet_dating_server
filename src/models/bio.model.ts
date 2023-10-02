"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IBio} from "../interface/model.interface";

const bioSchema = new Schema<IBio>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hobbies: {
        type: Array
    },
    zodiac: {
        type: String
    },
    description: {
        type: String
    }
})

export const Bio = model<IBio>('Bio', bioSchema);
