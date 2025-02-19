import {IVehicle, IVehicleL} from "@core/service/vehicle/vehicle.modal.ts";
import {IMessage, IResponse} from "@core/service/response.model.ts";
import axiosInstance from "@core/service";


export const addVehicle= async (data: IVehicle): Promise<IResponse<IMessage>> => {
    const response = await axiosInstance.post("/api/vehicle", data);
    return response.data;
}

export const getVehicleList= async (): Promise<IResponse<IVehicleL[]>> => {
    const response = await axiosInstance.get("/api/vehicle");
    return response.data;
}