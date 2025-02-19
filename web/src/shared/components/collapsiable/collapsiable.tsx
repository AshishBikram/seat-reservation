import type React from "react"
import { useState } from "react"
import Bus from "@assets/bus.jpg"
import {IVehicleL} from "@core/service/vehicle/vehicle.modal.ts";
import CustomButton from "@components/custom-button/CustomButton.tsx";

interface CollapsibleProps {
    vehicle: IVehicleL
    image?: string
    children?: React.ReactNode,
    isCollapsable?: boolean
}

const Collapsible: React.FC<CollapsibleProps> = ({
    vehicle,
    image,
    children,
    isCollapsable = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleView = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    return (
        <div className="shadow rounded-md overflow-hidden mt-3">
            <div className="w-full p-4 bg-gray-50 hover:bg-gray-200 flex justify-between items-center">
                <button className="flex-grow text-left flex items-center space-x-4" onClick={() => setIsOpen(!isOpen)}>
                    <img src={image || Bus} alt={vehicle?.name} width={60} height={60} className="rounded-full" />
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{vehicle?.name}</h3>
                        <div className="text-sm text-gray-600">
                            <p>
                                Rows: {vehicle?.totalRows} | Seats: {vehicle?.leftSeats} * {vehicle?.rightSeats}
                            </p>
                            <p>Price: Rs {vehicle?.price}</p>
                        </div>
                    </div>
                </button>
                {
                    isCollapsable && (
                        <CustomButton
                            variant={"primary"}
                            onClick={handleView}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            View
                        </CustomButton>
                    )
                }

            </div>
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isOpen && isCollapsable ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                {
                    isOpen && isCollapsable && (
                        <div className="p-4">{children}</div>
                    )
                }
            </div>
        </div>
    )
}

export default Collapsible