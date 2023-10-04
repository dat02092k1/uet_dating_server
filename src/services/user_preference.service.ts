import {Document} from "mongodb";
import {User} from "../models/user.model";
import {Api404Error} from "../core/error.response";
import {UserPreference} from "../models/user_preference.model";
import {Types} from "mongoose";
import {IUserPreference} from "../interface/model.interface";

export class User_preferenceService {
    static async addPreference(user_id: Types.ObjectId, preference: Partial<IUserPreference>): Promise<Document> {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        const userPreference = new UserPreference({
            user_id,
            ...preference,
        });

        await userPreference.save();

        return {
            preference: userPreference
        }
    }

}