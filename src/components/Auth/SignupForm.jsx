import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router'
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { axiosInstance } from '../../axios/axios'

const SignupForm = () => {
    const { signUpWithEmailAndPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            if (!hasUppercase) toast.error("At least 1 uppercase letter");
            if (!hasLowercase) toast.error("At least 1 lowercase letter");
            if (!hasMinLength) toast.error("At least 6 characters");
            setIsLoading(false);
            return false;
        }

        return true;
    }

    const insertUserInDB = async (name, photoURL, email) => {
        try {
            const result = await axiosInstance.post('/users', {
            displayName: name,
            photoURL,
            email
        })
        console.log(result.data);;
        }
        catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setError(null);
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (validatePassword(password)) {
            try {
                const result = await signUpWithEmailAndPassword(email, password, name, photoURL);
                const token = await result.user.getIdToken();
                if(token) {
                    localStorage.setItem('token', token);
                }
                console.log(token)
                setIsLoading(false);
                await insertUserInDB(name, photoURL, email);
                navigate('/')
            }
            catch (err) {
                toast.error(`Error: ${err.message}`)
            }
        }

    };

    return (
        <section className="min-h-screen bg-orange-50 flex items-center justify-center px-4 ">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-orange-200">
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
                    Create Your PawMart Account 🐾
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full rounded-lg form-font font-bold"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Profile Image URL
                        </label>
                        <input type="text" name="photoURL" placeholder="Paste image URL" className="input input-bordered w-full rounded-lg form-font font-bold" />
                    </div>

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
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to={'/login'} className="text-orange-600 font-semibold hover:underline" >
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignupForm;
