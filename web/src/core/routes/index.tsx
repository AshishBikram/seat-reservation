import {createBrowserRouter} from "react-router";
import appRoutes from "@core/routes/appRoutes.tsx";


const useRoutes = () => {
    return createBrowserRouter(appRoutes)
}

export default useRoutes;