"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {ILike} from "../interface/model.interface";

const likeSchema = new Schema<ILike>({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    target_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    liked_at: {
        type: Date,
    }
})

export const Like = model<ILike>('Like', likeSchema);
