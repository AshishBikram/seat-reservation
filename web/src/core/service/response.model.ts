import { ISeatsId} from "@core/service/vehicle/vehicle.modal.ts";

export interface IResponse<I>{
    status: string;
    data: I
}

export interface IMessage {
    message: string;
}

export interface ISocketResponse {
    seats: ISeatsId;
    date: string;
    vehicleId: number
}