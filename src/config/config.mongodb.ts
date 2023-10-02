'use strict';

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1' || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'uet_date'
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'shop_ecommerce_pro'
    }
}

const config: any = {dev, pro}
const env = process.env.NODE_ENV || 'dev';

export const cfg = config[env];