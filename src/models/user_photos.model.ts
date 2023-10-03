"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IUserPhotos} from "../interface/model.interface";

const userPhotosSchema = new Schema<IUserPhotos>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    photo: [
        {
            photo_url: String,
            public_id: String
        }
    ]
})

export const UserPhoto = model<IUserPhotos>('UserPhotos', userPhotosSchema);
