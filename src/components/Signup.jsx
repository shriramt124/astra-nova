import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Stars } from 'lucide-react';

const SignupPage = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        const username = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('https://astra-nova-team-dryrun.koyeb.app/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                onLogin(); // Call the onLogin prop to update the authentication state
                navigate('/'); // Redirect to the home page after signup
            } else {
                // Handle signup error
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
            <Link to="/" className="flex items-center space-x-3 mb-8">
                <Stars className="h-8 w-8 text-gray-700" />
                <span className="text-2xl font-light tracking-wider">
                    ASTRO<span className="font-semibold">NOVA</span>
                </span>
            </Link>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-light mb-6 text-center">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                            placeholder="Create a password"
                        />
                    </div>
 

                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        disabled={isLoading}
                    >
                        <UserPlus className="h-5 w-5" />
                        <span>Create Account</span>
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gray-900 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
