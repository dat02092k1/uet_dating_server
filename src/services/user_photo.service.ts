import {Api401Error, Api404Error, BusinessLogicError} from "../core/error.response";
import {cloudinary} from "../api_services/cloudinary";
import {User} from "../models/user.model";
import {UserPhoto} from "../models/user_photos.model";
import {uploadImg} from "../helpers/upload";
import { Types } from "mongoose";

export class User_photoService {
    static async uploadPhoto(files: any, user_id: Types.ObjectId) {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        const uploadResults = await uploadImg(files);

        const userPhotos = new UserPhoto({
            user_id: user_id,
            photo: uploadResults
        });

        await userPhotos.save();

        return {
            photos: userPhotos
        }
    }
}