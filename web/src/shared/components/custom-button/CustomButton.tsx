import type React from "react"
import { FaSpinner } from "react-icons/fa"

type CustomButtonProps = {
    variant: "primary" | "outline" | "danger" | "success"
    children: React.ReactNode | string
    disabled?: boolean
    isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton: React.FC<CustomButtonProps> = ({ variant, children, disabled, isLoading, ...props }) => {
    const baseStyles =
        "px-4 py-2 font-semibold transition-colors duration-200 ease-in-out cursor-pointer inline-flex items-center justify-center"

    const variants = {
        primary: "bg-red-800 text-white hover:bg-red-700",
        outline: "border-2 border-red-800 text-red-800 hover:bg-red-50",
        danger: "bg-red-600 text-white hover:bg-red-500",
        success: "bg-green-600 text-white hover:bg-green-500",
    }

    const disabledStyles = "opacity-50 cursor-not-allowed"

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${disabled || isLoading ? disabledStyles : ""}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    )
}

export default CustomButton