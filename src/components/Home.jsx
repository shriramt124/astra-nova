import React, { useState, useEffect } from 'react';
import { Stars, X, ArrowRight, Sun, Clock, MapPin, User, MessageCircle, LogIn, Loader2, Calculator, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (showForm) {
        return <BirthDetailsForm onBack={() => setShowForm(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-['Inter']">
            {/* Background */}
            <div className="fixed inset-0 opacity-30">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM2QjcyODAiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-20" />
            </div>

            {/* Navigation */}
            {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}

            {/* Floating Chatbot - Only visible when logged in */}
            {isLoggedIn && (
                <>
                    <button
                        onClick={() => setShowChatbot(!showChatbot)}
                        className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40"
                    >
                        <MessageCircle className="h-6 w-6" />
                    </button>

                    {showChatbot && (
                        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-xl z-40">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="font-medium">Astrology Assistant</h3>
                                <button
                                    onClick={() => setShowChatbot(false)}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="h-96 p-4 overflow-y-auto">
                                <div className="text-gray-500 text-center">
                                    How can I assist you with your astrological journey today?
                                </div>
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                    />
                                    <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Hero Section */}
            <section className="relative pt-32 lg:pt-40 pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gray-200 rounded-full blur-[160px] opacity-50" />

                    <div className="relative space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium tracking-wider rounded-full">
                            CELESTIAL GUIDANCE
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-gray-900">
                            Discover Your<br />
                            <span className="font-semibold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
                                Cosmic Blueprint
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Unlock the ancient wisdom of the stars and numbers through our precision-crafted astrological and numerological analyses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <button
                                onClick={() => navigate('/astrology')}
                                className="group bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg"
                            >
                                <Stars className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                <span className="font-medium">Get Your Birth Chart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium tracking-wider rounded-full">
                            OUR SERVICES
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-light mt-6 text-gray-900">Astrological Services</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Sun />}
                            title="Personal Horoscope"
                            description="Daily celestial guidance tailored to your exact birth chart and current transits."
                        />
                        <FeatureCard
                            icon={<Calculator />}
                            title="Numerology Reading"
                            description="Comprehensive analysis of your life path, destiny, and personal year numbers."
                        />
                        <FeatureCard
                            icon={<Calendar />}
                            title="Transit Calendar"
                            description="Detailed 12-month forecast of planetary influences and optimal timing."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

// Reuse existing components
const FeatureCard = ({ icon, title, description }) => (
    <div className="group relative bg-white/80 backdrop-blur-xl hover:bg-white p-8 rounded-2xl transition-all duration-300 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300" />
        <div className="relative space-y-6">
            <div className="p-3 bg-gray-100 rounded-lg inline-block">
                {React.cloneElement(icon, { className: "h-6 w-6 text-gray-700" })}
            </div>
            <h3 className="text-xl font-medium text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

export default HomePage;
