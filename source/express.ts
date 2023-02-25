import { Router } from "express";
import loginSystem from "./login/loginSystemComm";
import transport from "./transportBooking/transportComm";
import bodyParser from "body-parser";
import cors from "cors";
export default async ({ expressApp }) => {
    expressApp.use(cors({}));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: false }));
    expressApp.use(Router());
    await loginSystem(expressApp);
    await transport(expressApp);
}