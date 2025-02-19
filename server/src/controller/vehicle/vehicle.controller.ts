import {NextFunction, Request, Response} from 'express';
import {IVehicle} from "../../model/vehicle.model";
import {vehicleValidationSchema} from "../../validation-schema/vehicle.validation";
import {generateBusSeats} from "../../utils/generateSeats";
import {addSeats, addVehicle, getAllVehicles} from "../../service/vehicle.service";

//Function to add new vehicle to the data
export async function insert(req: Request, res: Response, next: NextFunction) {
    const data: IVehicle = {
        name: req.body.name,
        totalRows: req.body.totalRows,
        leftSeats: req.body.leftSeats,
        rightSeats: req.body.rightSeats,
        price: req.body.price
    }
    const {error, value} = vehicleValidationSchema.validate(data);

    if(error){
        next(error);
    }else {
        addVehicle(value).then((vehicle) => {
            if ("insertId" in vehicle) {
                const seatLayout = generateBusSeats(data?.totalRows, data?.leftSeats, data?.rightSeats);
                return addSeats(vehicle.insertId, seatLayout)
            }
        }).then((data) => {
            res.status(200).send({
                status: "success",
                data: {
                    message: "Vehicle added successfully"
                }
            })
        }).catch(error => {
            next(error);
        })
    }
}

//Function to get all the vehicles and vehicle information
export async function getVehicles(req: Request, res: Response, next: NextFunction) {
    getAllVehicles().then((vehicles) => {
        res.status(200).send({
            status: "success",
            data: vehicles
        })
    }).catch(error => {
        next(error);
    })
}


