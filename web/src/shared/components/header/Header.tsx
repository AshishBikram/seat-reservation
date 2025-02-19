import {navItems} from "@shared/resource/navItems.ts";
import {Link} from "react-router";


const Header= () => {
    return (
        <>
            <div className={"flex h-[50px] items-center gap-5 p-6 bg-black opacity-70"}>
                <div className={"text-2xl text-white"}>
                    Team Generator
                </div>
                <div className={"flex gap-2 items-center"}>
                    {
                        navItems.map((item, i) => {
                            return (
                                <Link
                                    key={i}
                                    to={item.path}
                                    className={"text-white hover:underline"}
                                >{item.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}
export default Header