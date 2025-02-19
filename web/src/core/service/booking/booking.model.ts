import {IID, ISeatsId, IVehicleL, SeatType} from "@core/service/vehicle/vehicle.modal.ts";

export interface IBookingUser {
    name: string,
    email: string,
}
export interface IBookings extends IBookingUser{
    vehicleID: number,
    fromPlace: string,
    toPlace: string,
    date: string,
    totalPrice: number,
    seatId: string[]
}

export interface IBookingList extends IID, Omit<IBookings, "seatId">{
    vehicleDetails: IVehicleL;
    bookedSeats: ISeatsId[]
}

export interface IBookedSeat{
    seatID: number,
    vehicleID: number,
    date: string,
    seatNumber: string,
    type: SeatType,
}
export interface IBookedSeatParams{
    vehicleID: number,
    date: string,
}