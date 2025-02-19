import {ISeats, SeatType} from "../model/vehicle.model";

export function generateBusSeats(rows: number, leftSeats: number, rightSeats: number): ISeats[] {
    let busSeats = [];
    let seatNumberA = 1, seatNumberB = 1, seatNumberC = 1;

    for (let r = 0; r < rows; r++) {
        if (r === rows -1) {
            busSeats.push(...generateLastRow(leftSeats, rightSeats, seatNumberC, r));
        } else {
            busSeats.push(...generateRow(leftSeats, rightSeats, seatNumberA, seatNumberB, r));
            seatNumberA += leftSeats;
            seatNumberB += rightSeats;
        }
    }

    return busSeats;
}

// Function to generate a normal row with aisle-adjacent seat types
function generateRow(leftSeats: number, rightSeats: number, seatNumberA: number, seatNumberB: number, rowNumber:number): ISeats[] {
    let rowLayout: ISeats[] = [];

    // Left-side seats (A section)
    for (let i = 0; i < leftSeats; i++) {
        let seatType: SeatType = i === 0 ? "window" : (i === leftSeats - 1 ? "window" : "regular"); // Last seat is window
        rowLayout.push({ seatNumber: `A${seatNumberA}`, type: seatType, rowNumber: rowNumber, colNumber: i });
        seatNumberA++;
    }

    // Aisle column (no seat, just an empty space)
    // You can skip adding a seat for the aisle column since it's just a space.

    // Right-side seats (B section)
    for (let j = 0; j < rightSeats; j++) {
        let seatType: SeatType = j === 0 ? "aisle" : (j === rightSeats - 1 ? "window" : "regular"); // Last seat is window
        rowLayout.push({ seatNumber: `B${seatNumberB}`, type: seatType, rowNumber: rowNumber, colNumber: leftSeats + 1 + j });
        seatNumberB++;
    }
    return rowLayout;
}

// Function to generate the last row with window seats on both ends
function generateLastRow(leftSeats: number, rightSeats: number, seatNumberC: number, rowNumber: number): ISeats[] {
    let lastRowLayout: ISeats[] = [];
    let totalSeats = leftSeats + rightSeats + 1; // +1 for the extra middle seat

    for (let c = 0; c < totalSeats; c++) {
        let seatType: SeatType = (c === 0 || c === totalSeats - 1) ? "window" : "regular"; // Window at both ends
        lastRowLayout.push({ seatNumber: `C${seatNumberC}`, type: seatType, rowNumber: rowNumber, colNumber: c });
        seatNumberC++;
    }

    return lastRowLayout;
}