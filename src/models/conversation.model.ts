"use strict"
import mongoose, {Schema, model,} from 'mongoose'
import {IConversation} from "../interface/model.interface";

const conversationSchema = new Schema<IConversation>({
    members: {
        type: Array
    },
}, {
    timestamps: true
})

export const Conversation = model<IConversation>('Conversation', conversationSchema);
