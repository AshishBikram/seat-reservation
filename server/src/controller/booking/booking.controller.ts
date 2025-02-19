import {NextFunction, Request, Response} from "express";
import {bookingValidation} from "../../validation-schema/booking.validation";
import {addBooking, addBookingSeats, getAllBookings, getBookedSeatsList} from "../../service/booking.service";
import {IBookedSeatParams, IBookings} from "../../model/booking.model";

//Function to create a new booking
export async function insert(req: Request, res: Response, next: NextFunction) {
    const data: IBookings = {
        vehicleID: req.body.vehicleID,
        name: req.body.name,
        email: req.body.email,
        fromPlace: req.body.fromPlace,
        toPlace: req.body.toPlace,
        date: req.body.date,
        totalPrice: req.body.totalPrice,
        seatId: req.body.seatId,
    }
    const {error, value} = bookingValidation.validate(data);

    if(error){
        console.error(error);
        next(error);
    }else {
        addBooking(value).then((booking) => {
            if ("insertId" in booking) {
                return addBookingSeats(booking.insertId, value.seatId)
            }
        }).then((data) => {
            res.status(200).send({
                status: "success",
                data: {
                    message: "Booking added successfully"
                }
            })
        }).catch(error => {
            next(error);
        })
    }
}
// Function to get all the bookings list
export async function getBookings(req: Request, res: Response, next: NextFunction) {
    getAllBookings().then((bookings) => {
        res.status(200).send({
            status: "success",
            data: bookings
        })
    }).catch(error => {
        next(error);
    })
}

//Function to get all the booked seats based on vehicle id and date
export async function getBookedSeats(req: Request, res: Response, next: NextFunction) {
    const data: IBookedSeatParams = {
        vehicleID: Number(req.params.id),
        date: req.query.date as string,
    }
    getBookedSeatsList(data).then((bookings) => {
        res.status(200).send({
            status: "success",
            data: bookings
        })
    }).catch(error => {
        next(error);
    })
}