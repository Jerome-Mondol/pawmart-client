import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import { axiosInstance } from "../axios/axios";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../pages/AddListing";

const fetchPetsData = async() => {
    const res = await axiosInstance.get('/pets');
    const data = res.data;

    return data;
}

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/pets-and-supplies",
                Component: PetsAndSupplies,
                loader: fetchPetsData
            },
            {
                path: '/add-listing',
                element: 
                <PrivateRoute>
                    <AddListing />
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/register',
        Component: SignupForm
    },
    {
        path: '/login',
        Component: LoginForm
    },
    
])