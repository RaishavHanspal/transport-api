import mongoose from "mongoose";
import config from "../configurables/config";
import { loginSystemController } from "./loginSystemController";
export default async(expressApp) => {
    /** a basic structure schema for login details object to be added in the database */
    const loginSchema: any = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true }
    });
    const loginModel = await mongoose.model(config.mongo.collections.loginCollection, loginSchema);
    const loginController = new loginSystemController(loginModel);

    expressApp.post(config.endpoints.signup, loginController.signup.bind(loginController));
    expressApp.post(config.endpoints.login, loginController.login.bind(loginController));
}