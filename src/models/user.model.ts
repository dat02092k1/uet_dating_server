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
        required: true 
    },
    profile_picture: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export const User = model<IUser>('User', userSchema);
