import mongoose from "mongoose";
import { Request, Response } from "express";
import { serverMessageConstants } from "../configurables/constantMessages";
import { IResponseBody } from "../interface";
export class loginSystemController {
    constructor(private loginModel: mongoose.Model<any, unknown, unknown, unknown, any>) {
        console.log("loginSystemController:: Instance created!");
    }

    /** on user login validates if entry is available in database and return respective info */
    public login(req: Request, res: Response): void {
        this.loginModel && this.loginModel.findOne({ username: req.body.username }).then((user: any): void => {
            if (!user) {
                res.send(serverMessageConstants.UNREGISTERED_USER as IResponseBody);
            }
            else if (user.password === req.body.password) {
                res.send({...serverMessageConstants.LOGIN_SUCCESS, username: req.body.username} as IResponseBody);
            }
            else {
                res.send(serverMessageConstants.INCORRECT_PASS as IResponseBody);
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }

    /** signup - only allows single insertion of user details, will not allow duplicate username in database */
    public signup(req: Request, res: Response): void {
        this.loginModel && this.loginModel.findOne({ username: req.body.username }).then((user: any): void => {
            if (!user) {
                this.loginModel.insertMany([{ username: req.body.username, password: req.body.password }]).then(() => {
                    res.send(serverMessageConstants.SIGNUP_SUCCESS as IResponseBody);
                }).catch((err) => {
                    res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
                })
            }
            else {
                res.send(serverMessageConstants.USER_REGISTERED as IResponseBody);
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }
}