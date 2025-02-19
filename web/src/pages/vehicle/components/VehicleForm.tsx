import {useForm} from "react-hook-form";
import InputField from "@components/input-field/InputField.tsx";
import {IVehicle} from "@core/service/vehicle/vehicle.modal.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {vehicleValidation} from "@shared/validation-schema/vehicle.validation.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CustomButton from "@components/custom-button/CustomButton.tsx";
import {addVehicle} from "@core/service/vehicle/vehicle.service.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";


const VehicleForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
    } = useForm({
        resolver: zodResolver<IVehicle>(vehicleValidation),
    });

    const {mutate, isPending} = useMutation({
        mutationFn: addVehicle,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["vehicle-list"]
            });
            navigate("/")
            toast(res.data.message)
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    const onSubmit = (data: IVehicle) => {
        mutate(data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex justify-center mt-4"}>
                <div className="flex flex-col">
                    <div className={"flex flex-wrap gap-2 w-[80%]"}>
                        <InputField<IVehicle>
                            name={"name"}
                            label={"Name"}
                            placeholder={"Enter Vehicle Name"}
                            control={control}
                        />
                        <InputField<IVehicle>
                            name={"totalRows"}
                            label={"Rows"}
                            type={"number"}
                            control={control}
                            placeholder={"Enter Total Rows"}
                        />
                        <InputField<IVehicle>
                            name={"leftSeats"}
                            type={"number"}
                            label={"Left Side Seats"}
                            control={control}
                            placeholder={"Enter Left Total Columns"}
                        />
                        <InputField<IVehicle>
                            name={"rightSeats"}
                            type={"number"}
                            label={"Right Side Seats"}
                            control={control}
                            placeholder={"Enter Right Total Columns"}
                        />
                        <InputField<IVehicle>
                            name={"price"}
                            type={"number"}
                            label={"Price"}
                            control={control}
                            placeholder={"Enter Price"}
                        />
                    </div>
                    <div>
                        <CustomButton isLoading={isPending} variant={"primary"} type="submit">Submit</CustomButton>
                    </div>
                </div>
            </form>
        </>
    )
}
export default VehicleForm;