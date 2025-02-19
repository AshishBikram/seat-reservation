import {ISeatsId, IVehicle, IVehicleL, SeatType} from "./vehicle.model";


interface IBookingAdd {
    vehicleID: number,
    name: string,
    email: string,
    fromPlace: string,
    toPlace: string,
    date: string,
    totalPrice: number,
}
export interface IBookings extends IBookingAdd{
    seatId: string[]
}

export interface IBookingList extends IBookings{
    vehicleDetails: IVehicleL;
    bookedSeats: ISeatsId[]
}

export interface IBookedSeat{
    seatId: number,
    vehicleID: number,
    date: string,
    seatNumber: string,
    type: SeatType,
}
export interface IBookedSeatParams{
    vehicleID: number,
    date?: string,
}