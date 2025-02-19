import SeatItem from "@pages/vehicle/components/SeatItem.tsx";

type CustomSeatItemVariantsProps = {
    variants: "available" | "unavailable" | "selected"
}
const SeatItemVariants = ({variants}:CustomSeatItemVariantsProps) => {
    return (
        <div className={"flex flex-col justify-center items-center gap-2 flex-wrap"}>
            <SeatItem
                className={"!h-[20px] !w-[20px]"}
                variant={variants}
            />
            <h1 className={"capitalize text-xs"}>{variants}</h1>
        </div>
    )
}
export default SeatItemVariants;