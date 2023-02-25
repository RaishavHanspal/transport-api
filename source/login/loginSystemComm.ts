import { Request, Response } from "express";
import mongoose from "mongoose";
import config from "../configurables/config";
import { loginSystemController } from "./loginSystemController";
export default async(expressApp, transportDb) => {
    /** a basic structure schema for login details object to be added in the database */
    const loginSchema: any = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true }
    });
    const loginModel = await mongoose.model(config.mongo.collections.loginCollection, loginSchema);
    const loginController = new loginSystemController(loginModel);

    expressApp.post("/signup", loginController.signup);

    expressApp.post("/login", loginController.login);
}