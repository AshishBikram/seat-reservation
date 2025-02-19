import {RouteObject} from "react-router";
import Layout from "@components/layout/Layout.tsx";
import VehiclePage from "@pages/vehicle/VehiclePage.tsx";
import AddVehiclePage from "@pages/vehicle/AddVehiclePage.tsx";
import HomePage from "@pages/home/HomePage.tsx";
import BookingDetails from "@pages/booking/BookingDetailsPage.tsx";
import BookingListPage from "@pages/booking/BookingListPage.tsx";


const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout /> ,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "vehicle",
                children: [
                    {
                        index: true,
                        element: <VehiclePage />
                    },
                    {
                        path: "vehicle/add",
                        element: <AddVehiclePage />
                    }
                ]
            },
            {
                path: "booking",
                children: [
                    {
                        index: true,
                        element: <BookingDetails />

                    },
                    {
                        path: "list",
                        element: <BookingListPage />
                    }
                ]
            },

        ]
    },
]
export default appRoutes;