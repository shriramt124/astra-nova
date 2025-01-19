import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Stars } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('https://astra-nova-team-dryrun.koyeb.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                onLogin();
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
            {/* Logo section with responsive sizing */}
            <Link to="/" className="flex items-center space-x-3 mb-8 transform hover:scale-105 transition-transform">
                <Stars className="h-8 w-8 md:h-10 md:w-10 text-gray-700" />
                <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider">
                    ASTRO<span className="font-semibold">NOVA</span>
                </span>
            </Link>

            {/* Login container with responsive width and padding */}
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-center">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className={`w-full px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all`}
                            placeholder={`Enter your email`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className={`w-full px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all`}
                            placeholder={`Enter your password`}
                        />
                    </div>

                    {/* Responsive button with hover effects */}
                    <button
                        type="submit"
                        className={`w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 md:py-4 rounded-lg font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2`}
                        disabled={isLoading}
                    >
                        <LogIn className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="text-base md:text-lg">Login</span>
                    </button>

                    {/* Responsive text for sign up link */}
                    <p className="text-center text-gray-600 text-sm md:text-base">
                        Don't have an account?{' '}
                        <Link to="/signup" className={`text-gray-900 hover:underline font-medium`}>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
