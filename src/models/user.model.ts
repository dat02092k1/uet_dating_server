"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IUser} from "../interface/model.interface";

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    location: {
        type: String
    },
    birthdate: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
    },
    profile_picture: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export const User = model<IUser>('User', userSchema);
