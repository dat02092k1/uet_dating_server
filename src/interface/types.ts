import { Request } from "express";
import { Types } from "mongoose";

export enum UserRole {
    User = 'User',
    Admin = 'Admin'
 }

export interface IAuthUser {
    id: Types.ObjectId,
    email: string,
    password: string,
    role: UserRole
 }

export interface UserRequest extends Request {
    user: IAuthUser,
    body: any,
    params: any,
    query: any,
    file: any
 }