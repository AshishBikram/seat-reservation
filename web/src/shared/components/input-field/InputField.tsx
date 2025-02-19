import {Control, Controller, FieldValues, Path} from "react-hook-form";

type InputFieldProps<I extends FieldValues> = {
    name: Path<I>;
    control: Control<I>;
    disabled?: boolean;
    placeholder?: string;
    label: string,
    type?: "text" | "number" | "email"
}
const InputField = <I extends FieldValues,>({name, control, label, type = "text", disabled, placeholder}: InputFieldProps<I>) => {
    return (
        <Controller
            name={name}
            control={control}
            disabled={disabled}
            render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                    <>
                        <div className={"flex-col"}>
                            <label>
                                {label}
                            </label>
                            <input
                                type={type}
                                disabled={disabled}
                                className={`block w-full px-3 py-2 h-[34px]
                                    border rounded-sm shadow-sm min-w-[250px]
                                    text-gray-900 placeholder-gray-400
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                     [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]
                                     disabled:text-gray-500 disabled:cursor-not-allowed
                                    ${error ? "border-red-300" : "border-gray-300"}`}
                                placeholder={placeholder}
                                value={value}
                                onChange={(e) => {
                                    if(type === "number") {
                                        onChange(+e.target.value)
                                    }else {
                                        onChange(e)
                                    }
                                }}
                            />
                            <div className={"h-[24px] text-red-500"}>
                                {error?.message}
                            </div>
                        </div>
                    </>

                )
            }}
        />
    )
}

export default InputField