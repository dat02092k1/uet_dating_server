import {Document} from "mongodb";
import {User} from "../models/user.model";
import {Api400Error, Api403Error, Api404Error, Api409Error, BusinessLogicError} from "../core/error.response";
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

    static async findUsersByPreference(user_id: Types.ObjectId) {
        const targetUser = await User.findById(user_id).lean();

        if (!targetUser) throw new Api404Error('User not found');

        let userPreference = await UserPreference.findOne({user_id});

        if (!userPreference) throw new Api404Error('User preference not found');


        const queryCondition = {
            max_age: { $lte: userPreference.max_age }, // Maximum age condition
            min_age: { $gte: userPreference.min_age }, // Minimum age condition
            preferred_distance_max: { $gte: userPreference.preferred_distance_max }, // Maximum preferred distance condition
            preferred_distance_min: { $lte: userPreference.preferred_distance_min }, // Minimum preferred distance condition
            preferred_gender: 1, // Preferred gender condition (0 for one gender, 1 for the other, or any other logic)
        };

        const target = await UserPreference.find(queryCondition).lean();

        console.log(target);

        // Create an aggregation pipeline
        const pipeline = [
            {
                $match: queryCondition,
            },
            {
                $lookup: {
                    from: 'users', // Your User collection name
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $lookup: {
                    from: 'bios', // Your Bio collection name
                    localField: 'user._id',
                    foreignField: 'user_id',
                    as: 'bio',
                },
            },
            {
                $lookup: {
                    from: 'userphotos', // Your UserPhotos collection name
                    localField: 'user._id',
                    foreignField: 'user_id',
                    as: 'photos',
                },
            },
            {
                $project: {
                    user: 1,
                    bio: { $arrayElemAt: ['$bio', 0] },
                    photos: { $arrayElemAt: ['$photos', 0] },
                },
            },
        ];

        const results = [];
        UserPreference.aggregate(pipeline).exec()
            .then((results) => {
                // Do something with the results
                console.log('results', results);
                results.push(results);
            })
            .catch((err) => {
                console.error(err);
            });;

            return {
                results
            }
    }
}