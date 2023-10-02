"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IMessage} from "../interface/model.interface";

const messageSchema = new Schema<IMessage>({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Conversation'
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String
    }
}, {
    timestamps: true
})

export const Message = model<IMessage>('Message', messageSchema);
