import mongoose from "mongoose";
import { Request, Response } from "express";
import httpResponseHeaders from "../httpResponseHeaders";

export class transportController {
    constructor(private transportModel: mongoose.Model<any, unknown, unknown, unknown, any>) {
        console.log("transportController:: Instance created!");
    }

    /** creates a new order/booking 
     * @todo - need to maintain a unique booking id - currently using bookedOn property from schema
     */
    public newBooking(req: Request, res: Response): void {
        httpResponseHeaders(res);
        this.transportModel && this.transportModel.findOne({ bookedOn: req.body.bookedOn }).then((user: any): void => {
            if (!user) {
                this.transportModel.insertMany([req.body]);
                res.send({ msg: "Booking Successful!", success: true });
            }
            else {
                res.send({ msg: "duplicate insertion - something is not right!", success: false });
            }
        })
    }

    /** delete the booking from the records - cancel ticket/booking */
    public cancelBooking(req: Request, res: Response): void {
        httpResponseHeaders(res);
        this.transportModel && this.transportModel.findOne({ username: req.body.username, bookedOn: req.body.bookedOn }).then((user: any): void => {
            if (user) {
                this.transportModel.deleteOne({ bookedOn: req.body.bookedOn }).then(() => {
                    res.send({ msg: "booking cancelled!", success: true });
                }).catch(() => {
                    res.send({ msg: "Issue while updating database", success: false });
                })
            }
            else {
                res.send({ msg: "No bookings found", success: true });
            }
        }).catch((err) => {
            res.send({ msg: "Please try again!", success: false });
        });
    }

    /** get all the bookings from the records */
    public getBookings(req: Request, res: Response): void {
        httpResponseHeaders(res);
        this.transportModel && this.transportModel.findOne({ username: req.body.username }).then((user: any): void => {
            if (user) {
                this.transportModel.find({ username: req.body.username }).then((bookings: Array<any>) => {
                    res.send(JSON.stringify(bookings));
                }).catch(() => {
                    res.send({ msg: "Issue while fetching from database", success: false });
                })
            }
            else {
                res.send({ msg: "No bookings found", success: true });
            }
        }).catch((err) => {
            res.send({ msg: "Please try again!", success: false });
        });
    }

}