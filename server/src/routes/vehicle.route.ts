import {Router} from "express";
import {getVehicles, insert} from "../controller/vehicle/vehicle.controller";

const vehicleRoutes =  Router();

vehicleRoutes.post("/", insert)
vehicleRoutes.get("/",getVehicles)

export default vehicleRoutes;