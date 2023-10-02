import _ from 'lodash';

export class UtilFunc {
    static getInfoData ({ fields = [] as string[], object = {} }) {
        return _.pick(object, fields);
    }

    static generateAccessToken(payload: any) {
        return 'token';
    }
}
