import mongoose from "mongoose";
import config from "./configurables/config";
export default async() => {
    mongoose.connect(`${config.mongo.uri}${config.mongo.db.name}`).then(() => {
        console.log("mongodb connected ::", config.mongo.db.name);
    }).catch(() => {
        console.log("mongodb failed to connect");
    });
}