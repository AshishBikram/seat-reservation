import ContainerLayout from "@components/layout/ContainerLayout.tsx";
import CustomButton from "@components/custom-button/CustomButton.tsx";
import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getVehicleList} from "@core/service/vehicle/vehicle.service.ts";
import Collapsiable from "@components/collapsiable/collapsiable.tsx";
import SeatsLayout from "@pages/vehicle/components/SeatsLayout.tsx";

const VehiclePage = () => {
    const navigate = useNavigate();
    const {data: vehicleList} = useQuery({
        queryFn: getVehicleList,
        queryKey: ["vehicle-list"]
    })
    return (
        <>
            <ContainerLayout
                title={"Vehicle List"}
                button={
                    <CustomButton
                        variant={"outline"}
                        onClick={() => {
                            navigate("vehicle/add")
                        }}
                    >Add Vehicle</CustomButton>}
            >
                {
                    vehicleList?.data?.map((vehicle) => (
                        <>
                            <Collapsiable
                                vehicle={vehicle}
                                key={vehicle.id}
                            >
                                <SeatsLayout vehicle={vehicle} />
                            </Collapsiable>
                        </>
                    ))
                }

            </ContainerLayout>
        </>
    )
}

export default VehiclePage