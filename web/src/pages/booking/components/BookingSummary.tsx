import { FaCalendarAlt, FaBus} from "react-icons/fa"
import {SearchType} from "@components/travel-search/TravelSearch.tsx";
import {ISeatsId} from "@core/service/vehicle/vehicle.modal.ts";
import SeatItem from "@pages/vehicle/components/SeatItem.tsx";

interface BookingSummaryProps {
    search: SearchType
    totalPrice: number;
    selectedSeats: ISeatsId[]
}

const BookingSummary = ({ search, totalPrice,selectedSeats }: BookingSummaryProps) => {

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Booking Details</div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <FaBus className="text-gray-500 mr-2" />
                        <span className="text-lg font-medium text-gray-700">
                            {search?.fromPlace} to {search?.toPlace}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <span className="text-gray-600">{new Date(search?.date).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Selected Seats</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {selectedSeats?.map((seat) => (
                            <SeatItem variant={"unavailable"} title={seat?.seatNumber} />
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex  items-center mt-2">
                        <span className="text-gray-700">Total Price: </span>
                        <span className="text-xl font-bold text-indigo-600"> Rs {totalPrice}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookingSummary

