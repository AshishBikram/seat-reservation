import {QueryResult} from "mysql2";
import {connection} from "../config/dbConnection";
import { IBookedSeatParams, IBookingList, IBookings} from "../model/booking.model";

// query to insert booking information
export async function addBooking(data: IBookings): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }

            const query = `Insert into booking (VehicleID, name, email, fromPlace,toPlace, date, totalPrice) values (?,?,?,?,?, ?, ?)`
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
// add booked seats
export async function addBookingSeats(bookingId: number, seatId: number[]): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = "INSERT INTO Booking_Seats (bookingId, seatId) VALUES ?";
            const values = seatId.map((seat) => [bookingId, seat]);
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
// query to get all the bookings information
export async function getAllBookings(): Promise<IBookingList[]> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = "SELECT \n" +
                "    b.ID,\n" +
                "    b.name,\n" +
                "    b.email,\n" +
                "    b.fromPlace,\n" +
                "    b.toPlace,\n" +
                "    b.date,\n" +
                "    b.totalPrice,\n" +
                "    JSON_OBJECT(\n" +
                "        'ID', v.ID,\n" +
                "        'name', v.Name,\n" +
                "        'totalRows', v.TotalRows,\n" +
                "        'leftSeats', v.LeftSeats,\n" +
                "        'rightSeats', v.RightSeats,\n" +
                "        'price', v.Price\n" +
                "    ) AS vehicleDetails,\n" +
                "    JSON_ARRAYAGG(\n" +
                "        JSON_OBJECT(\n" +
                "            'ID', vs.ID,\n" +
                "            'seatNumber', vs.seatNumber,\n" +
                "            'type', vs.type,\n" +
                "            'rowNumber', vs.rowNumber,\n" +
                "            'colNumber', vs.colNumber\n" +
                "        )\n" +
                "    ) AS bookedSeats\n" +
                "FROM Booking b\n" +
                "JOIN Vehicle v ON b.VehicleID = v.ID\n" +
                "LEFT JOIN Booking_Seats bs ON b.ID = bs.BookingId\n" +
                "LEFT JOIN Vehicle_Seats vs ON bs.SeatId = vs.ID\n" +
                "GROUP BY b.ID;";
            connection.query(query, (err: Error, resultSet: IBookingList[]) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                return resolve(resultSet);
            });
        });
    });
}

// query to get the list of booked seats based on date and vehicle
export async function getBookedSeatsList(data: IBookedSeatParams): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                return reject(err);
            }
            const query = 'SELECT vs.VehicleID, \n' +
           'b.date, \n' +
           'vs.ID AS seatID, \n' +
           'vs.seatNumber, \n' +
           'vs.type \n' +
            'FROM Booking_Seats bs\n' +
            'INNER JOIN Vehicle_Seats vs ON bs.SeatId = vs.ID \n' +
            'INNER JOIN Booking b ON bs.BookingId = b.ID\n' +
            `WHERE vs.VehicleID = ? \n` +
                `and b.date=?;`;
            connection.query(query,[data.vehicleID, data.date], (err, resultSet) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                return resolve(resultSet);
            });

        });
    });
}
