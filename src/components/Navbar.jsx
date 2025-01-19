import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stars, User, LogIn, Menu, X } from 'lucide-react';

const Navbar = ({ isLoggedIn, setIsLoggedIn, isScrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={` mx-auto w-full  fixed top-0 z-50  transition-all duration-300`}>
            <div className={` mx-auto px-4 sm:px-6 lg:px-8  ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <div className="flex justify-around items-center h-20">
                    {/* Logo and brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Stars className="h-6 w-6 text-blue-600" />
                        <span className="text-xl font-bold">ASTRONOVA</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <button
                                onClick={() => setIsLoggedIn(false)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <User className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <LogIn className="h-5 w-5" />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <User className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;