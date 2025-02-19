import joi from 'joi';
//Validation schema
export const vehicleValidationSchema = joi.object({
    name: joi.string().required(),
    totalRows: joi.number().required(),
    leftSeats: joi.number().required(),
    rightSeats: joi.number().required(),
    price: joi.number().required()
})