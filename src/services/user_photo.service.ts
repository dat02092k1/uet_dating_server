import {Api401Error, Api404Error, BusinessLogicError} from "../core/error.response";
import {cloudinary} from "../api_services/cloudinary";
import {User} from "../models/user.model";
import {UserPhoto} from "../models/user_photos.model";
import {removeImg, uploadImg} from "../helpers/photosCloud";
import mongoose, {Types} from "mongoose";
import {IPhoto} from "../interface/model.interface";

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

    static async deletePhoto(user_id: Types.ObjectId, photo_id: string) {
        const userPhotos = await UserPhoto.findOne({user_id: user_id});

        if (!userPhotos) throw new Api404Error('User not found');

        let targetPhoto:any;
        for (let i = 0; i < userPhotos.photo.length; i++) {
            if (userPhotos.photo[i]._id.toString() === photo_id.toString()) {
                targetPhoto = userPhotos.photo[i];
            }
        }

        if (userPhotos.photo.indexOf(targetPhoto) !== -1) {
            const targetPhotoIndex = userPhotos.photo.indexOf(targetPhoto);
            userPhotos.photo.splice(targetPhotoIndex, 1);
        }

        await userPhotos.save();

        await removeImg(targetPhoto?.public_id?? '');

        await userPhotos.save();
        return {
            data: userPhotos
        }
    }

    static async addPhoto(user_id: Types.ObjectId, file: any) {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        const userPhotos = await UserPhoto.findOne({user_id: user_id});

        if (!userPhotos) throw new Api404Error('User not found');

        const [{photo_url, public_id}]: any = await uploadImg([file]);

        const uploadResult: { photo_url: string; _id: string; public_id: string } = {
            photo_url: photo_url,
            public_id: public_id,
            _id: new mongoose.Types.ObjectId().toString()
        };

        if (userPhotos.photo.indexOf(uploadResult) === -1) {
            userPhotos.photo.push(uploadResult);
        }

        await userPhotos.save();

        return {
            data: userPhotos
        }
    }
}