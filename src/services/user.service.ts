import {IUser} from "../interface/model.interface";
import {Types} from "mongoose";
import {User} from "../models/user.model";
import {Api403Error, Api404Error} from "../core/error.response";
import {UtilFunc} from "../utils/func";

export class UserService {
    static async update (user: Partial<IUser>, user_id: Types.ObjectId) {
        let targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        if (targetUser._id.toString() !== user_id.toString()) throw new Api403Error('You are not allowed to update this bio');

        targetUser = UtilFunc.updateObj(targetUser, user);

        await targetUser.save();

        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: targetUser })
        }
    }

    static async getUserById (user_id: Types.ObjectId) {
        let targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: targetUser })
        }
    }
}