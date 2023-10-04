import {Document} from "mongodb";
import {User} from "../models/user.model";
import {Api400Error, Api403Error, Api404Error, Api409Error} from "../core/error.response";
import {UserPreference} from "../models/user_preference.model";
import {Types} from "mongoose";
import {IUserPreference} from "../interface/model.interface";
import {UtilFunc} from "../utils/func";
import {utilConstants} from "../utils/constants";

export class User_preferenceService {
    static async addPreference(user_id: Types.ObjectId, preference: Partial<IUserPreference>): Promise<Document> {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        if (!preference.preferred_gender) throw new Api400Error('gender preference is required');

        const userPreference = new UserPreference({
            user_id,
            ...preference,
        });

        await userPreference.save();

        return {
            preference: userPreference
        }
    }

    static async editPreference(user_id: Types.ObjectId, preference: Partial<IUserPreference>): Promise<Document> {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        let userPreference = await UserPreference.findOne({user_id});

        if (!userPreference) throw new Api404Error('User preference not found');

        else {
            userPreference = UtilFunc.updateObj(userPreference, preference);

            await userPreference?.save();

            return {
                preference: userPreference
            }
        }
    }
}