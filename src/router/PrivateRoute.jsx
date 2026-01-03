import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router';



const PrivateRoute = ({ children }) => {
    const { user, loading }  = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
           )
    }
    if(!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }



    return children;
}

export default PrivateRoute
