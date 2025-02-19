import {ISeatsId, IVehicleL} from "@core/service/vehicle/vehicle.modal.ts";
import SeatItem from "@pages/vehicle/components/SeatItem.tsx";
import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import SeatItemVariants from "@pages/vehicle/components/SeatItemVariants.tsx";
import SelectionSummary from "@pages/vehicle/components/SelectionSummary.tsx";
import {useNavigate} from "react-router";
import {SearchType} from "@components/travel-search/TravelSearch.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBookedSeats} from "@core/service/booking/booking.service.ts";
import {socket} from "../../../socket.ts";
import {ISocketResponse} from "@core/service/response.model.ts";


type SeatsLayoutProps = {
    vehicle: IVehicleL,
    search?: SearchType,
}

// Connect to backend
const SeatsLayout = ({vehicle, search}:SeatsLayoutProps) => {
    const navigate = useNavigate();
    const [concurrentBooking, setConcurrentBooking] = useState<number[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<ISeatsId[]>([]);

    const {data: bookedSeats} = useQuery({
        queryKey: [`booked-seats-${vehicle.id}-${search?.date}`],
        queryFn: () => getBookedSeats({
            date: search?.date ?? "",
            vehicleID: vehicle?.id,
        }),
        enabled: search?.date !== undefined,
    })

    useEffect(() => {
        // Listen for incoming messages
        socket.on("book seats", (data:ISocketResponse) => {
            if(vehicle?.id === data?.vehicleId && search?.date === data?.date){
                const isInConcurrentBooking = concurrentBooking?.findIndex(d => d === data?.seats?.id) !== -1 ||
                    selectedSeats?.findIndex(d => d.id === data?.seats?.id) !== -1;
                if(!isInConcurrentBooking){
                    setConcurrentBooking(prevState => [...prevState, data?.seats?.id]);
                }else {
                    setConcurrentBooking(pre => {
                        return pre.filter(d => d !== data?.seats?.id);
                    })
                }
            }
        });
    }, [selectedSeats]);

    const sendMessage = (seats: ISeatsId) => {
        socket.emit("book seats", {seats, vehicleId: vehicle?.id, date:search?.date});
    };

    const totalPrice = useMemo(() => {
        return vehicle.price * selectedSeats.length;
    }, [selectedSeats])

    const handleSelect = (seat: ISeatsId) => {
        const isAlreadyInList = selectedSeats.findIndex(d => d.id === seat.id) !== -1;
        if(!isAlreadyInList) {
            setSelectedSeats([...selectedSeats, seat]);
        }else{
            const updatedSeats = selectedSeats.filter(d => d.id !== seat.id)
            setSelectedSeats(updatedSeats);
        }
        sendMessage(seat)

    }
    const getVariant = useCallback((seat: ISeatsId) => {
        const isBooked = bookedSeats?.data.findIndex(d => d.seatID === seat?.id) !== -1 ||
            concurrentBooking?.findIndex(d => d === seat?.id) !== -1;
        console.log(seat,isBooked,concurrentBooking, bookedSeats);
        const isSelected = selectedSeats?.findIndex(data => data.id === seat?.id) !== -1
        if(isBooked){
            return "unavailable"
        }else if(isSelected){
            return "selected"
        }else {
            return "available"
        }
    },[selectedSeats,bookedSeats, concurrentBooking])
    const handleBooking = () => {
        navigate("/booking", {
            state: {
                search,
                selectedSeats,
                totalPrice,
            }
        });
    }
    return (
        <>
            <div className={"flex gap-4"}>
                <div className={"w-[250px] bg-gray-200 rounded-sm p-5"}>
                    <div className={`grid grid-cols-${vehicle?.leftSeats + vehicle?.rightSeats + 1} gap-2`}>

                        {Array.from({length: vehicle?.totalRows}).map((_, rowIndex) => {
                            return (
                                <Fragment key={rowIndex}>
                                    {Array.from({length: vehicle?.leftSeats + vehicle?.rightSeats + 1}).map((_, colIndex) => {
                                        const d = vehicle?.seats?.find(d => d.colNumber === colIndex && d.rowNumber === rowIndex + 1)
                                        const variant = getVariant(d!)
                                        if (!d) {
                                            return (
                                                (
                                                    <div key={`aisle-${rowIndex}-${colIndex}`}/>
                                                )
                                            )
                                        } else {
                                            return (
                                                <SeatItem
                                                    variant={variant}
                                                    title={d.seatNumber}
                                                    key={`seat-${rowIndex}-${colIndex}`}
                                                    onClick={() => {
                                                        handleSelect(d)
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                                </Fragment>
                            );
                        })}
                    </div>
                    <div
                        className={"flex gap-2 mt-5"}
                    >
                        <SeatItemVariants variants={"available"}/>
                        <SeatItemVariants variants={"unavailable"}/>
                        <SeatItemVariants variants={"selected"}/>
                    </div>
                </div>
                <div className={"p-10"}>
                    <SelectionSummary selectedSeats={selectedSeats} totalPrice={totalPrice} onClick={() => {handleBooking()}}/>
                </div>
            </div>
        </>
    )
}
export default SeatsLayout;