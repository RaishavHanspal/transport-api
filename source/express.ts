import express from "express";
import loginSystem from "./login/loginSystemComm";
import transport from "./transportBooking/transportComm";
export default async ({expressApp}) => {
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));
    await loginSystem(expressApp);
    await transport(expressApp);
}