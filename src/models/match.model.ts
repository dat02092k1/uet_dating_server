"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IMatch} from "../interface/model.interface";

const matchSchema = new Schema<IMatch>({
    user1_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    user2_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    matched_at: {
        type: Date,
    }
}, )

export const Match = model<IMatch>('Match', matchSchema);
