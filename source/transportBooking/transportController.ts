import mongoose from "mongoose";
import { Request, Response } from "express";
import { serverMessageConstants } from "../configurables/constantMessages";
import { IResponseBody } from "../interface";

export class transportController {
    constructor(private transportModel: mongoose.Model<any, unknown, unknown, unknown, any>) {
        console.log("transportController:: Instance created!");
    }

    /** creates a new order/booking 
     * @todo - need to maintain a unique booking id - currently using bookedOn property from schema
     */
    public newBooking(req: Request, res: Response): void {
        this.transportModel && this.transportModel.findOne({ bookedOn: req.body.bookedOn }).then((user: any): void => {
            if (!user) {
                this.transportModel.insertMany([req.body]).then((ack) => {
                    res.send(serverMessageConstants.BOOKING_SUCCESS as IResponseBody);
                }).catch((err) => {
                    res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
                });
            }
            else {
                res.send(serverMessageConstants.DUPLICATE_BOOKING as IResponseBody);
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }

    /** delete the booking from the records - cancel ticket/booking */
    public cancelBooking(req: Request, res: Response): void {
        this.transportModel && this.transportModel.findOne({ username: req.body.username, bookedOn: req.body.bookedOn }).then((user: any): void => {
            this.transportModel.deleteOne({ bookedOn: req.body.bookedOn }).then(() => {
                res.send(serverMessageConstants.CANCEL_BOOKING as IResponseBody);
            }).catch((err) => {
                res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
            })
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }

    /** get all the bookings from the records */
    public getBookings(req: Request, res: Response): void {
        this.transportModel && this.transportModel.find({ username: req.body.username }).then((booking: any): void => {
            if (booking) {
                this.transportModel.find({ username: req.body.username }).then((bookings: Array<any>) => {
                    res.send({
                        ...serverMessageConstants.BOOKINGS_FOUND, entries: bookings,
                        msg: serverMessageConstants.BOOKINGS_FOUND.msg.replace("%0", String(bookings.length))
                    } as IResponseBody);
                }).catch((err) => {
                    res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
                })
            }
        }).catch((err) => {
            res.send({ ...serverMessageConstants.DB_MODEL_CONNECTIVITY_ISSUE, err } as IResponseBody);
        });
    }

}