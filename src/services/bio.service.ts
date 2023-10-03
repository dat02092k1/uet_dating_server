import {User} from "../models/user.model";
import {Api401Error, Api403Error, Api404Error} from "../core/error.response";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {UtilFunc} from "../utils/func";
import { IBio, IUser } from "../interface/model.interface";
import { Bio } from "../models/bio.model";
import { Types } from "mongoose";

dotenv.config();

export class BioService {
    static async createBio (bio: Partial<IBio>, user_id: string) {
        const {
            hobbies, zodiac, description
        } = bio; 

        let targetUser = await User.findById(user_id).lean(); 
        
        if (!targetUser) throw new Api404Error('User not found');

        const newBio = new Bio({...bio, user_id});

        await newBio.save();

        return {
            userBio: UtilFunc.getInfoData({ fields: ['_id', 'zodiac', 'description', 'hobbies'], object: newBio }),
        }
    }

    static async getBio (user_id: Types.ObjectId) {
        
        let targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        let targetBio = await Bio.findOne({user_id}).populate('user_id');

        if (!targetBio) throw new Api404Error('Bio not found');

        return {
            bio: targetBio,
            user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: targetBio.user_id })
        }
    }
}