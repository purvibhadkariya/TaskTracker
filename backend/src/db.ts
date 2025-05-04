import * as config from './config';
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let dbUrl = 'mongodb://' + config.DB_HOST + '/' + config.DB_NAME;

if (config.DB_USERNAME && config.DB_PASSWORD && config.DB_SOURCE) {
    dbUrl = 'mongodb://' + config.DB_USERNAME + ':' +
        config.DB_PASSWORD + '@' + config.DB_HOST +
        '/' + config.DB_NAME + '?authSource=' + config.DB_SOURCE
}

export const connect = async () => {
    mongoose.connect(dbUrl);
}

export const close = () => {
    mongoose.connection.close();
}