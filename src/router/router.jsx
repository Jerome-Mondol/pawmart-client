import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import { axiosInstance } from "../axios/axios";
import PrivateRoute from "./PrivateRoute";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import ListingDetails from "../pages/ListingDetails";
import MyOrders from "../pages/MyOrders";
import Error from "../pages/Error";
import FilteredProducts from "../pages/FilteredProducts";

const fetchPetsData = async() => {
    const res = await axiosInstance.get('/listings');
    const data = res.data;
    return data;
}

export const filteredProductsLoader = async ({ params }) => {
  try {
    const res = await axiosInstance.get(`/category-filtered-product/${params.categoryName}`);
    return res.data;
  } catch (error) {
    console.error("Error loading category products:", error);
    throw new Response("Failed to fetch products", { status: 500 });
  }
};


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
                path: '/listing/:id',
                element:
                <PrivateRoute>
                    <ListingDetails />
                </PrivateRoute> 
            },
            {
                path: '/add-listing',
                element: 
                <PrivateRoute>
                    <AddListing />
                </PrivateRoute>
            },
            {
                path: '/my-listing',
                element: 
                <PrivateRoute>
                    <MyListings />
                </PrivateRoute>
            },
            {
                path: '/my-orders',
                element:
                <PrivateRoute>
                    <MyOrders />
                </PrivateRoute>
            },
            {
                path: '/category-filtered-product/:categoryName',
                Component: FilteredProducts,
                loader: filteredProductsLoader
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
    {
        path: '*',
        Component: Error
    }
    
])