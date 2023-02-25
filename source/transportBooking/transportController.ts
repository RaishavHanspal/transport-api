import mongoose from "mongoose";
import { Request, Response } from "express";

export class transportController{
    constructor(private transportModel: mongoose.Model<any, unknown, unknown, unknown, any>){
        console.log("transportController:: Instance created!");
    }

    /** creates a new order/booking 
     * @todo - need to maintain a unique booking id - currently using bookedOn property from schema
     */
    public newBooking(req: Request, res: Response): void{
        this.transportModel && this.transportModel.findOne({ bookedOn: req.body.bookedOn }).then((user: any): void => {
            if(!user){
                this.transportModel.insertMany([req.body]);
                res.send("Booking Successful!");
            }
            else{
                res.send("duplicate insertion - something is not right!");
            }
        })
    }

    /** delete the booking from the records - cancel ticket/booking */
    public cancelBooking(req: Request, res: Response): void{
        this.transportModel && this.transportModel.findOne({ username: req.body.username, bookedOn: req.body.bookedOn }).then((user: any): void => {
            if(user){
                this.transportModel.deleteOne({ bookedOn: req.body.bookedOn }).then(() => {
                    res.send("booking cancelled!");
                }).catch(() => {
                    res.send("Issue while updating database");
                })
            }
            else{
                res.send("No bookings found");
            }
        }).catch((err) => {
            res.send("Please try again!");
        });
    }

     /** get all the bookings from the records */
     public getBookings(req: Request, res: Response): void{
        this.transportModel && this.transportModel.findOne({ username: req.body.username }).then((user: any): void => {
            if(user){
                this.transportModel.find({ username: req.body.username }).then((bookings: Array<any>) => {
                    res.send(JSON.stringify(bookings));
                }).catch(() => {
                    res.send("Issue while fetching from database");
                })
            }
            else{
                res.send("No bookings found");
            }
        }).catch((err) => {
            res.send("Please try again!");
        });
    }

}