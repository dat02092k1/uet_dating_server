import {Types} from "mongoose";

export interface IUser {
    name: string;
    password: string;
    email: string;
    phone: string;
    gender: number;
    birthdate: string;
    location: string;
    role: string;
    profile_picture: string;
}

export interface IBio {
    user_id: Types.ObjectId;
    hobbies: string[];
    description: string;
    zodiac: string;
}

export interface IUserPreference {
    user_id: Types.ObjectId;
    min_age: number;
    max_age: number;
    preferred_gender: number; // 0: for woman 1: for man 2: for both
    preferred_distance_min: number;
    preferred_distance_max: number;
}

interface IPhoto {
    photo_url: string;
    photo_id: string;
    _id: string;
}

export interface IUserPhotos {
    user_id: Types.ObjectId;
    photo: IPhoto[];
}

export interface IMatch {
    user1_id: Types.ObjectId;
    user2_id: Types.ObjectId;
    matched_at: Date;
}

export interface ILike {
    sender_id: Types.ObjectId;
    target_id: Types.ObjectId;
    liked_at: Date;
}

export interface IConversation {
    members: [];
}

export interface IMessage {
    conversation_id: Types.ObjectId;
    sender_id: Types.ObjectId;
    content: string;
}