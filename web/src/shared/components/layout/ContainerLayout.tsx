import {ReactNode} from "react";

type ContainerLayoutProps = {
    title: string;
    button?: ReactNode;
    children?: ReactNode;
}
const ContainerLayout= ({title, button, children}:ContainerLayoutProps ) => {
    return (
        <>
            <div className={"p-5"}>
                <div className="flex justify-between mt-5">
                    <h1 className={"text-2xl font-bold"}>{title}</h1>
                    <div>
                        {button}
                    </div>
                </div>
                {children}
            </div>

        </>
    )
}
export default ContainerLayout