import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";

const LoginForm = () => {
    const { logInWithEmailAndPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setIsLoading(true);
        setError(null);
        try {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;


            const result = await logInWithEmailAndPassword(email, password);
            const token = await result.user.getIdToken();
            if (token) {
                localStorage.setItem('token', token);
            }
            console.log(token)
            setIsLoading(false);
            navigate('/')
        }
        catch (err) {
            toast.error(`Error: ${err.message}`)
            console.log(err)
        }
    };

    return (
        <section className="min-h-screen bg-orange-50 flex items-center justify-center px-4 ">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-orange-200">
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                    Log in to your pawMart Account 🐾
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Email Address
                        </label>
                        <input type="email" name="email" placeholder="example@mail.com" className="input input-bordered w-full rounded-lg form-font font-bold" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Password
                        </label>
                        <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full rounded-lg form-font font-bold" required />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">
                            {error}
                        </p>
                    )}

                    <button type="submit" disabled={isLoading} className="btn bg-orange-500 hover:bg-orange-600 border-none w-full text-white text-lg rounded-lg" >
                        {isLoading ? "Logging in....." : "Log in"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Don't have an account?{" "}
                    <Link to={'/register'} className="text-orange-600 font-semibold hover:underline" >
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default LoginForm;
