import {ISeats, IVehicle, IVehicleL} from "../model/vehicle.model";
import {connection} from "../config/dbConnection";
import {QueryResult} from "mysql2";


export async function addVehicle(data: IVehicle): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = `Insert into vehicle (name, totalRows, leftSeats, rightSeats,price) values (?,?,?,?,?)`
            const values = Object.values(data)
            connection.query(query,values, (err, resultSet) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                return resolve(resultSet);
            });
        });
    });
}

export async function addSeats(vehicleId: number, seats: ISeats[]): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = "INSERT INTO Vehicle_Seats (VehicleID, seatNumber, type, rowNumber, colNumber) VALUES ?";
            const values = seats.map((seat) => [vehicleId, seat.seatNumber, seat.type, seat.rowNumber, seat.colNumber]);
            connection.query(query,[values], (err, resultSet) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                return resolve(resultSet);
            });
        });
    });
}

export async function getAllVehicles(): Promise<IVehicleL> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = "SELECT v.id, v.name, v.totalRows, v.leftSeats, v.rightSeats, v.price, JSON_ARRAYAGG( JSON_OBJECT( 'id', s.id, 'seatNumber', s.seatNumber, 'vehicleID', s.vehicleID, 'type', s.type, 'rowNumber', s.rowNumber, 'colNumber', s.colNumber  ) ) AS seats FROM vehicle v LEFT JOIN ( SELECT id, seatNumber, vehicleID, type, rowNumber, colNumber FROM Vehicle_Seats ORDER BY id asc ) s ON v.id = s.vehicleID GROUP BY v.id;";
            connection.query(query, (err: Error, resultSet: IVehicleL) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                return resolve(resultSet);
            });
        });
    });
}


