import {IMessage, IResponse} from "@core/service/response.model.ts";
import axiosInstance from "@core/service";
import {IBookedSeat, IBookedSeatParams, IBookingList, IBookings} from "@core/service/booking/booking.model.ts";

export const addBooking= async (data: IBookings): Promise<IResponse<IMessage>> => {
    const response = await axiosInstance.post("/api/booking", data);
    return response.data;
}

export const getBooking= async (): Promise<IResponse<IBookingList[]>> => {
    const response = await axiosInstance.get("/api/booking");
    return response.data;
}

export const getBookedSeats= async (data: IBookedSeatParams): Promise<IResponse<IBookedSeat[]>> => {
    const response = await axiosInstance.get(`/api/booking/${data.vehicleID}/booked-seats`,{params:data});
    return response.data;
}