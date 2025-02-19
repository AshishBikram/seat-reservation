import './App.css'
import {RouterProvider} from "react-router";
import useRoutes from "@core/routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

function App() {
    const routes = useRoutes();
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <RouterProvider router={routes} />
            </QueryClientProvider>
        </>
    )
}

export default App
