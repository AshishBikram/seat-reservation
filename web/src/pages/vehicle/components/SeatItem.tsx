

type SeatItemProps = {
    title?: string;
    onClick?: () => void;
    variant?: "available" | "unavailable" | "selected";
    className?: string;
}
const SeatItem = ({title, onClick, variant = "available", className}: SeatItemProps) => {
    const baseStyles ="rounded-sm w-[35px] h-[35px] flex justify-center items-center font-medium cursor-pointer";
    const variants = {
        "available": "bg-white text-black",
        "selected": "bg-green-700 text-white",
        "unavailable": "bg-gray-400 text-black-600 opacity-50 cursor-not-allowed pointer-events-none",
    }
    return (
        <>
            <div onClick={onClick} className={`${className} ${variant && variants[variant]} ${baseStyles}`}>{title}</div>
        </>
    )
}
export default SeatItem