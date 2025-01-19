import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Loader2, Sun, Moon, Star } from 'lucide-react';
import AstroChatbot from './AstraChatBotComponent';

const BirthChartAnalysis = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        timeOfBirth: '',
        placeOfBirth: ''
    });
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/birth-chart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch birth chart data');
            }

            const data = await response.json();
            setChartData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-[150px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Birth Details Form */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-light mb-6">Enter Birth Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            icon={<User />}
                            label="Full Name"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            required
                        />

                        <FormField
                            icon={<Calendar />}
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            required
                        />

                        <FormField
                            icon={<Clock />}
                            label="Time of Birth"
                            type="time"
                            value={formData.timeOfBirth}
                            onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                            required
                        />

                        <FormField
                            icon={<MapPin />}
                            label="Place of Birth"
                            type="text"
                            value={formData.placeOfBirth}
                            onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                            placeholder="City, Country"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <><Loader2 className="h-5 w-5 animate-spin" /><span>Calculating...</span></>
                            ) : (
                                <><Star className="h-5 w-5" /><span>Generate Birth Chart</span></>
                            )}
                        </button>

                        {error && (
                            <p className="text-red-500 text-center">{error}</p>
                        )}
                    </form>
                </div>

                {/* Graha Chart Display */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    {chartData ? (
                        <GrahaChart data={chartData} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Enter birth details to see your planetary positions
                        </div>
                    )}
                </div>
            </div>
            <AstroChatbot />
        </div>
    );
};

const FormField = ({ icon, label, type, value, onChange, placeholder, required }) => (
    <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            {React.cloneElement(icon, { className: "h-4 w-4 text-gray-600" })}
            <span>{label}</span>
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-400"
        />
    </div>
);

const GrahaChart = ({ data }) => {
    // Example data structure expected from backend:
    // data = [
    //   { graha: "Sun", position: 120, house: 4, sign: "Leo" },
    //   { graha: "Moon", position: 45, house: 2, sign: "Taurus" },
    //   ...
    // ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-light mb-6">Planetary Positions</h2>

            {/* Circular Chart */}
            <div className="relative w-full pt-[100%]">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200">
                    {data.map((planet, index) => (
                        <PlanetaryPosition
                            key={planet.graha}
                            planet={planet}
                            totalPlanets={data.length}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Graha List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {data.map((planet) => (
                    <div
                        key={planet.graha}
                        className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
                    >
                        <PlanetIcon name={planet.graha} />
                        <div>
                            <h3 className="font-medium">{planet.graha}</h3>
                            <p className="text-sm text-gray-600">
                                House {planet.house} • {planet.sign}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PlanetaryPosition = ({ planet, totalPlanets, index }) => {
    const angle = (index * 360) / totalPlanets;
    const radius = 45; // percentage of container width

    const position = {
        left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
        top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
        transform: 'translate(-50%, -50%)',
    };

    return (
        <div
            className="absolute w-8 h-8 flex items-center justify-center"
            style={position}
        >
            <PlanetIcon name={planet.graha} />
        </div>
    );
};

const PlanetIcon = ({ name }) => {
    const icons = {
        Sun: <Sun className="h-6 w-6 text-yellow-500" />,
        Moon: <Moon className="h-6 w-6 text-gray-400" />,
        Mars: <div className="h-6 w-6 rounded-full bg-red-500" />,
        Mercury: <div className="h-6 w-6 rounded-full bg-green-500" />,
        Jupiter: <div className="h-6 w-6 rounded-full bg-purple-500" />,
        Venus: <div className="h-6 w-6 rounded-full bg-pink-500" />,
        Saturn: <div className="h-6 w-6 rounded-full bg-indigo-500" />,
        Rahu: <div className="h-6 w-6 rounded-full bg-gray-800" />,
        Ketu: <div className="h-6 w-6 rounded-full bg-gray-600" />
    };
    

    return icons[name] || <Star className="h-6 w-6 text-gray-400" />;
};

export default BirthChartAnalysis;