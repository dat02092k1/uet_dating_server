"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IUserPreference} from "../interface/model.interface";

const userPreferenceSchema = new Schema<IUserPreference>({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    max_age: {
        type: Number,
        default: 28
    },
    min_age: {
        type: Number,
        default: 18
    },
    preferred_distance_min: {
        type: Number,
        default: 0
    },
    preferred_distance_max: {
        type: Number,
        default: 30
    },
    preferred_gender: {
        type: Number
    }
})

export const UserPreference = model<IUserPreference>('UserPreference', userPreferenceSchema);
