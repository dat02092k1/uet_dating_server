import {User} from "../models/user.model";
import {Api403Error, Api404Error} from "../core/error.response";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {UtilFunc} from "../utils/func";

dotenv.config();

export class AuthService {
    static async signup (user: any) {
        var holderUser = await User.findOne({
            $or: [
                { email: user.email },
                { phone: user.phone },
            ]
        }).lean();

        if (holderUser) throw new Api403Error('User existed');

        const hashPassword = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS || '10'));

        user.password = hashPassword;

        const newUser = new User(user);
        await newUser.save();
        console.log(newUser);
        return {
            metadata: {
                user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: newUser }),
                token: UtilFunc.generateAccessToken(newUser)
            }
        }
    }
}