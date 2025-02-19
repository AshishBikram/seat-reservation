import {useLocation, useNavigate} from "react-router";
import ContainerLayout from "@components/layout/ContainerLayout.tsx";
import BookingSummary from "@pages/booking/components/BookingSummary.tsx";
import BookingUserForm from "@pages/booking/components/BookingUserForm.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addBooking} from "@core/service/booking/booking.service.ts";
import {IBookingUser} from "@core/service/booking/booking.model.ts";
import {ISeatsId} from "@core/service/vehicle/vehicle.modal.ts";
import dayjs from "dayjs";
import {toast} from "react-toastify";


const BookingDetailsPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {state} = useLocation()
    const {mutate} = useMutation({
        mutationFn: addBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookingList"]
            })
            navigate("/booking/list")
        },
        onError: err => {
            toast.error(err.message);
        }
    })

    const handleBooking = (d: IBookingUser) => {
        mutate({
            name: d.name,
            email: d.email,
            vehicleID: state.selectedSeats[0].vehicleID,
            fromPlace: state.search.fromPlace,
            toPlace: state.search.toPlace,
            date: dayjs(state.search.date).format('YYYY-MM-DD'),
            totalPrice: state.totalPrice,
            seatId: state.selectedSeats.map((d: ISeatsId) => d.id)
        })
    }
    return (
        <>
            <ContainerLayout
                title={"Booking Details"}
            >
                <div className={"flex"}>
                    <BookingUserForm handleSubmitForm={(d) => {
                        handleBooking(d)
                    }}/>
                    <BookingSummary search={state?.search} totalPrice={state?.totalPrice} selectedSeats={state?.selectedSeats} />
                </div>
            </ContainerLayout>
        </>
    )
}
export default BookingDetailsPage