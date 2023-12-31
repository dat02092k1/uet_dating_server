import {User} from "../models/user.model";
import {Api401Error, Api403Error, Api404Error} from "../core/error.response";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {UtilFunc} from "../utils/func";
import { IUser } from "../interface/model.interface";
import {Document} from "mongodb";

dotenv.config();

export class AuthService {
    static async signup (user: Partial<IUser>): Promise<Document> {
        var holderUser = await User.findOne({
            $or: [
                { email: user.email },
                { phone: user.phone },
            ]
        }).lean();

        if (holderUser) throw new Api403Error('User existed');

        const hashPassword = await bcrypt.hash(user.password!, parseInt(process.env.SALT_ROUNDS || '10'));

        user.password = hashPassword;

        const newUser = new User(user);
        await newUser.save();
        console.log(newUser);
        return {
                user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: newUser }),
                token: UtilFunc.generateAccessToken(newUser)
        }
    }

    static async signin (user: Partial<IUser>): Promise<Document> {
        const {
            email, password
        } = user; 

        let targetUser = await User.findOne({ email }).lean(); 
        
        if (!targetUser) throw new Api404Error('User not found');

        const isMatch = await bcrypt.compareSync(password!, targetUser.password);

        if (!isMatch) throw new Api401Error('Wrong password');

        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'location', 'email', 'name', 'profile_picture', 'gender'], object: targetUser }),
            token: UtilFunc.generateAccessToken(targetUser) 
        }
    }
}