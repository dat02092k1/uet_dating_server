import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { utilConstants } from './constants';
export class UtilFunc {
    static getInfoData ({ fields = [] as string[], object = {} }) {
        return _.pick(object, fields);
    }

    static generateAccessToken(user: any) {
        return jwt.sign({id: user._id, role: user.role}, utilConstants.JWT_SECRET, {expiresIn: '1d'});
    }
}
