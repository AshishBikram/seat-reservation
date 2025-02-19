import ContainerLayout from "@components/layout/ContainerLayout.tsx";
import CustomButton from "@components/custom-button/CustomButton.tsx";
import {useNavigate} from "react-router";
import VehicleForm from "@pages/vehicle/components/VehicleForm.tsx";


const AddVehiclePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <ContainerLayout
                title={"Add Vehicle"}
                button={
                    <CustomButton
                        variant={"outline"}
                        onClick={() => {
                            navigate(-1)
                        }}
                    >Back</CustomButton>}
            >

                <VehicleForm />
            </ContainerLayout>
        </>
    )
}
export default AddVehiclePage;