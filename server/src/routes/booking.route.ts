import {Router} from "express";
import {getBookedSeats, getBookings, insert} from "../controller/booking/booking.controller";

const bookingRoutes =  Router();

bookingRoutes.post("/", insert)
bookingRoutes.get("/",getBookings)
bookingRoutes.get("/:id/booked-seats",getBookedSeats)

export default bookingRoutes;