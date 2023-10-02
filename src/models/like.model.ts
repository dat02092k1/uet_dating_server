"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {ILike} from "../interface/model.interface";

const likeSchema = new Schema<ILike>({
    sender_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    target_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    liked_at: {
        type: Date.now()
    }
})

export const Like = model<ILike>('Like', likeSchema);
