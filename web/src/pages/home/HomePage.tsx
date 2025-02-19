import ContainerLayout from "@components/layout/ContainerLayout.tsx";
import {useQuery} from "@tanstack/react-query";
import {getVehicleList} from "@core/service/vehicle/vehicle.service.ts";
import Collapsiable from "@components/collapsiable/collapsiable.tsx";
import SeatsLayout from "@pages/vehicle/components/SeatsLayout.tsx";
import TravelSearch, {SearchType} from "@components/travel-search/TravelSearch.tsx";
import {useState} from "react";

const HomePage = () => {
    const [search, setSearch] = useState<SearchType>()
    const {data: vehicleList, refetch} = useQuery({
        queryFn: getVehicleList,
        queryKey: ["vehicle-list"],
        enabled: !!search,
    })
    return (
        <ContainerLayout
            title={"Book Now"}
        >
            <div>
                <TravelSearch
                    onClick={(d) => {
                        setSearch(d)
                        refetch()
                    }}/>
            </div>
            {
                vehicleList?.data && search && vehicleList?.data?.map((vehicle) => (
                    <>
                        <Collapsiable
                            isCollapsable={true}
                            vehicle={vehicle}
                            key={vehicle.id}
                        >
                            <div className={"flex"}>
                                <SeatsLayout vehicle={vehicle} search={search}/>
                            </div>
                        </Collapsiable>
                    </>
                ))
            }
            {
                !(vehicleList?.data && vehicleList?.data?.length > 0) && (
                    <div className={"flex justify-center items-center h-[100px]"}>
                        <div className={"text-2xl"}>Search the destination</div>
                    </div>
                )
            }
        </ContainerLayout>
    )
}
export default HomePage