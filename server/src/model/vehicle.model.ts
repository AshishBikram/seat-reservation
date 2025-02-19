
interface IID{
    id: number
}
export interface IVehicle {
    name: string;
    totalRows: number;
    leftSeats: number;
    rightSeats: number;
    price: number;
}



export type SeatType = 'window' | "aisle" | "regular";
export interface ISeats {
    seatNumber: string;
    type: SeatType;
    rowNumber: number;
    colNumber: number;
}

export interface ISeatsId extends ISeats, IID {

}

export interface IVehicleL extends IVehicle, IID {
    seats: ISeatsId;
}