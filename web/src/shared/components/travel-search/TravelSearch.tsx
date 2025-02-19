
import type React from "react"
import { useState } from "react"
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa"
import CustomButton from "@components/custom-button/CustomButton.tsx"
import dayjs from "dayjs";

export type SearchType = {
    fromPlace: string,
    toPlace: string,
    date: string,
}
type TravelSearchProps = {
    onClick: (d: SearchType) => void;
}

const TravelSearch = ({onClick}: TravelSearchProps) => {
    const [fromPlace, setFromPlace] = useState("Kathmandu")
    const [toPlace, setToPlace] = useState("Pokhara")
    const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

    const handleSearch = (event: React.FormEvent) => {


        event.preventDefault()
        // Add your search logic here
        onClick({ fromPlace, toPlace, date })
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="From"
                                value={fromPlace}
                                disabled={true}
                                onChange={(e) => setFromPlace(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="To"
                                value={toPlace}
                                disabled={true}
                                onChange={(e) => setToPlace(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="date"
                                value={date}
                                min={dayjs(new Date()).format("YYYY-MM-DD")}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <CustomButton
                        variant="outline"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        <FaSearch className="inline-block mr-2 h-4 w-4" />
                        Search
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default TravelSearch

