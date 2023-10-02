import {Types} from "mongoose";

export interface IUser {
    name: string;
    password: string;
    email: string;
    phone: string;
    gender: number;
    birthdate: string;
    location: string;
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