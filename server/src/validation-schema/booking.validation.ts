import joi from 'joi';
//Validation schema
export const bookingValidation = joi.object({
    vehicleID: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    fromPlace: joi.string().required(),
    toPlace: joi.string().required(),
    date: joi.string().required(),
    totalPrice: joi.number().required(),
    seatId: joi.array().items(joi.number().required()),
})