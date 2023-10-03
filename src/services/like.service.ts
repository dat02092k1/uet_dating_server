import {User} from "../models/user.model";
import {Api404Error} from "../core/error.response";
import {Like} from "../models/like.model";
import {Match} from "../models/match.model";
import {redisClient} from "../api_services/redis";

export class LikeService {
    static async like(user: string, targetUser: string) {
        // Check if both users exist in MongoDB
        const [holderUser, foundUser] = await Promise.all([
            User.findById(user).lean(),
            User.findById(targetUser).lean(),
        ]);

        if (!holderUser || !foundUser) {
            throw new Api404Error('User not found');
        }

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

            const matchedKey = `matched:${user}-${targetUser}`;
            await redisClient.set(matchedKey, JSON.stringify(match), 'EX', 86400);

            return {
                message: 'You matched!!!'
            }
        }
        
        return {
            message: 'You liked this user'
        }
    }
}