import {ISeatsId} from "@core/service/vehicle/vehicle.modal.ts";
import CustomButton from "@components/custom-button/CustomButton.tsx";


type SelectionSummaryProps = {
    selectedSeats: ISeatsId[],
    onClick: () => void,
    totalPrice: number,
}
const SelectionSummary = ({selectedSeats, onClick, totalPrice}: SelectionSummaryProps) => {
    return (
        <>
            <div className={"flex flex-col gap-4"}>
                <div className={"h-[50px]"}>
                    <div>
                        Selected Seats:
                    </div>
                    <div>
                        {
                            selectedSeats.length > 0 && selectedSeats.map((seat: ISeatsId) => {
                                return `${seat.seatNumber},`
                            })
                        }
                    </div>

                </div>
                <div className={"h-[50px]"}>
                    <div>
                        Price:
                    </div>
                    <div>
                        {totalPrice}
                    </div>

                </div>
                <div>
                    <CustomButton
                        disabled={!(selectedSeats.length > 0)}
                        onClick={onClick}
                        variant="primary"
                    >
                        Book
                    </CustomButton>
                </div>
            </div>
        </>
    )
}

export default SelectionSummary