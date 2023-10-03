import {User} from "../models/user.model";
import {Api404Error} from "../core/error.response";
import {Like} from "../models/like.model";
import {Match} from "../models/match.model";

export class LikeService {
    static async like(user: string, targetUser: string) {
        console.log(user, targetUser)
        const holderUser = await User.findById(user).lean();

        if (!holderUser) throw new Api404Error('User not found');

        const foundUser = await User.findById(targetUser).lean();
        if (!foundUser) throw new Api404Error('User not found');

        const like = new Like({
            sender_id: user,
            target_id: targetUser
        });

        await like.save();

        const likeEachOthera = await Like.exists({sender_id: user, target_id: targetUser});
        const likeEachOtherb = await Like.exists({sender_id: targetUser, target_id: user});

        if (likeEachOthera && likeEachOtherb) {
            const match = new Match({user1_id: user, user2_id: targetUser, matched_at: new Date()});
            await match.save();
            return {
                message: 'You matched!!!'
            }
        }
        
        return {
            message: 'You liked this user'
        }
    }
}