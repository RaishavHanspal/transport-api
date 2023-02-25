import mongoose from "mongoose"
import config from "../configurables/config";
import { transportController } from "./transportController";

export default async(expressApp) => {
    const transportBookingSchema: mongoose.Schema = new mongoose.Schema({
        username: { type: String, required: true },
        isLoggedin: { type: Boolean, required: true },
        source: {type:String, required: true},
        destination: { type: String, required: true },
        bookedOn: { type: String, required: true },
        dateOfBoarding: {type: String, required: true},
        paymentMode: { type:String, required: false}
    });

    const transportModel: any = await mongoose.model(config.mongo.collections.transportCollection, transportBookingSchema);
    const bookingController = new transportController(transportModel);

    expressApp.post("/book", bookingController.newBooking.bind(bookingController));
    expressApp.post("/cancel", bookingController.cancelBooking.bind(bookingController));
    expressApp.post("/getbookings", bookingController.getBookings.bind(bookingController));
}