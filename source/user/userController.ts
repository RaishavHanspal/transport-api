import mongoose from "mongoose";
import { Request, Response } from "express";
import { serverMessageConstants } from "../configurables/constantMessages";
import { IResponseBody } from "../interface";

export class userDetailsController {
    constructor(private userModel: mongoose.Model<any, unknown, unknown, unknown, any>) { };
    /** get user details */
    public getUserDetails(req: Request, res: Response): void {
        this.userModel.findOne({ username: req.body.username }).then((userDetailObj: any): void => {
            if (!userDetailObj) {
                res.send(serverMessageConstants.NO_USER_DETAILS as IResponseBody)
            }
            else {
                res.send({ ...serverMessageConstants.USER_DETAILS, entries: userDetailObj });
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }

    /** set and/or update user details */
    public setUserDetails(req: Request, res: Response): void {
        this.userModel.findOne({ username: req.body.username }).then((userDetailObj: any): void => {
            if (!userDetailObj) {
                this.userModel.insertMany([req.body]).then((ack) => {
                    res.send(serverMessageConstants.USER_DETAILS_UPDATED as IResponseBody);
                }).catch((err) => {
                    res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
                });
            }
            else {
                this.userModel.replaceOne({ username: req.body.username }, req.body, { upsert: true }).then((ack) => {
                    res.send(serverMessageConstants.USER_DETAILS_UPDATED as IResponseBody);
                }).catch((err) => {
                    res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
                });
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }
}