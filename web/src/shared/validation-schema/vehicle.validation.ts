import * as zod from 'zod';

export const vehicleValidation = zod.object({
    name: zod.string({message: "Name is required"}),
    totalRows: zod.number({message: "Total Rows is required"}).max(15, "Max rows is 15").min(1, "Row can't be negative"),
    leftSeats: zod.number({message: "Left Seats is required"}).max(4, "Max left is 4").min(1, "Left Seats can't be negative"),
    rightSeats: zod.number({message: "Right Seats is required"}).max(4, "Max right is 4").min(1, "Right seats can't be negative"),
    price: zod.number({message: "Price is required"}).min(1, "Price can't be negative"),
})