import express, { Request, Response } from "express";
import loginSystem from "./login/loginSystemComm";
export default async ({expressApp, transportDb}) => {
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));
    await loginSystem(expressApp, transportDb);
}