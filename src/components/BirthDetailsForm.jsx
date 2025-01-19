// BirthDetailsForm.jsx
const BirthDetailsForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        timeOfBirth: '',
        gender: '',
        location: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const FormField = ({ icon, label, type, value, onChange, placeholder }) => (
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
                required
                className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-400"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-['Inter'] p-4 sm:p-6">
            <div className="max-w-2xl mx-auto pt-20">
                <button
                    onClick={onBack}
                    className="mb-8 text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
                >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    <span>Back to Home</span>
                </button>

                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-light mb-8 text-gray-900">Enter Your Birth Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            icon={<User />}
                            label="Full Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                        />

                        <FormField
                            icon={<Calendar />}
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />

                        <FormField
                            icon={<Clock />}
                            label="Time of Birth"
                            type="time"
                            value={formData.timeOfBirth}
                            onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                        />

                        <FormField
                            icon={<MapPin />}
                            label="Birth Location"
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="City, Country"
                        />

                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg mt-8"
                        >
                            Calculate Birth Chart
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BirthDetailsForm;