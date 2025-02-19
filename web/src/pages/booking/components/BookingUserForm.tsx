import InputField from "@components/input-field/InputField.tsx";
import {useForm} from "react-hook-form";
import CustomButton from "@components/custom-button/CustomButton.tsx";
import {IBookingUser} from "@core/service/booking/booking.model.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {bookingUserValidation} from "@shared/validation-schema/booking.validation.ts";

type BookingUserFormProps = {
    handleSubmitForm: (data: IBookingUser) => void;
}
const BookingUserForm = ({handleSubmitForm}: BookingUserFormProps) => {
    const {control, handleSubmit} = useForm<IBookingUser>({
        resolver: zodResolver(bookingUserValidation)
    })
    const onSubmit = (data: IBookingUser) => {
        handleSubmitForm(data)
    }
    return (
        <div className={"min-w-[50%] p-5"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField<IBookingUser> name={"name"} type={"text"} control={control} label={"Name"} />
                <InputField<IBookingUser> name={"email"} type={"email"} control={control} label={"Email"} />
                <CustomButton variant={"primary"}>
                    Confirm Booking
                </CustomButton>
            </form>

        </div>
    )
}
export default BookingUserForm