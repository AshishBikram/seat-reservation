import Header from "@components/header/Header.tsx";
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <>
            <div className={"flex justify-center min-h-[500px]"}>
                <div className={"w-[50%]"}>
                    <Header />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Layout