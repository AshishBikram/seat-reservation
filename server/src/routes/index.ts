import {Router} from "express";
import vehicleRoutes from "./vehicle.route";
import bookingRoutes from "./booking.route";


const appRoutes =  Router();

appRoutes.use("/vehicle", vehicleRoutes)
appRoutes.use("/booking", bookingRoutes)

export default appRoutes;