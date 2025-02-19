import {useQuery} from "@tanstack/react-query";
import {getBooking} from "@core/service/booking/booking.service.ts";
import dayjs from "dayjs";
import ContainerLayout from "@components/layout/ContainerLayout.tsx";

const BookingListPage = () => {
    const {data: bookingList} = useQuery({
        queryKey: ["bookingList"],
        queryFn: getBooking
    })
    return (<>

        <ContainerLayout
            title={"Booking List"}
        >
            <div className={"rounded-t-xl overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 p-10 mt-5"}>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className={"px-2 py-2 text-gray-600"}>SN</th>
                            <th className={"px-2 py-2 text-gray-600"}>Name</th>
                            <th className={"px-2 py-2 text-gray-600"}>Vehicle</th>
                            <th className={"px-2 py-2 text-gray-600"}>Email</th>
                            <th className={"px-2 py-2 text-gray-600"}>Date</th>
                            <th className={"px-2 py-2 text-gray-600"}>Price</th>
                            <th className={"px-2 py-2 text-gray-600"}>From</th>
                            <th className={"px-2 py-2 text-gray-600"}>To</th>
                            <th className={"px-2 py-2 text-gray-600"}>Seats</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingList?.data?.map((booking, index) => (
                                <tr key={booking?.id}>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{index+1}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.name}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.vehicleDetails?.name}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.email}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{dayjs(booking?.date).format("YYYY-MM-DD")}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.totalPrice}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.fromPlace}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{booking?.toPlace}</td>
                                    <td className={"border border-gray-500 px-2 py-2 text-gray-600 font-medium"}>{
                                        booking?.bookedSeats?.map((bookedSeat) => (bookedSeat?.seatNumber + ","))
                                    }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </ContainerLayout>

    </>)

}
export default BookingListPage