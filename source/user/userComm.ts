import mongoose from "mongoose"
import config from "../configurables/config";
import { userDetailsController } from "./userController";

export default async (expressApp) => {
    const userDetailsSchema = new mongoose.Schema({
        username: {type:String, required: true},
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        dob: { type: String },
        address: { type: String }
    });
    
    const userDetailsModel: any = await mongoose.model(config.mongo.collections.userDetailsCollection, userDetailsSchema);
    const userController: userDetailsController = new userDetailsController(userDetailsModel);
    expressApp.post(config.endpoints.getUser, userController.getUserDetails.bind(userController));
    expressApp.post(config.endpoints.setUser, userController.setUserDetails.bind(userController));
}