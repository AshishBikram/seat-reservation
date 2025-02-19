import * as zod from "zod";

export const bookingUserValidation = zod.object({
    name: zod.string({message: "Name is required"}),
    email: zod.string({message: "Email is required"}).email("Invalid email address"),
})