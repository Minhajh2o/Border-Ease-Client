import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { 
    HiOutlineGlobeAlt, 
    HiOutlinePhotograph, 
    HiOutlineDocumentText,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineUserGroup,
    HiOutlineClipboardList,
    HiOutlinePlus
} from 'react-icons/hi';

const AddVisa = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        countryName: '',
        countryImage: '',
        visaType: '',
        processingTime: '',
        requiredDocuments: [],
        description: '',
        ageRestriction: '',
        fee: '',
        validity: '',
        applicationMethod: ''
    });

    const visaTypes = [
        'Tourist Visa',
        'Student Visa',
        'Work Visa',
        'Business Visa',
        'Transit Visa',
        'Official Visa'
    ];

    const documentOptions = [
        'Valid passport',
        'Visa application form',
        'Recent passport-sized photograph',
        'Proof of accommodation',
        'Travel insurance',
        'Bank statements',
        'Flight itinerary',
        'Employment letter',
        'Invitation letter',
        'Educational documents'
    ];

    const applicationMethods = ['Online', 'Embassy', 'Visa Center', 'On Arrival'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDocumentChange = (doc) => {
        setFormData(prev => ({
            ...prev,
            requiredDocuments: prev.requiredDocuments.includes(doc)
                ? prev.requiredDocuments.filter(d => d !== doc)
                : [...prev.requiredDocuments, doc]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.requiredDocuments.length < 3) {
            toast.error('Please select at least 3 required documents');
            return;
        }

        setLoading(true);

        const visaData = {
            ...formData,
            ageRestriction: parseInt(formData.ageRestriction),
            fee: parseFloat(formData.fee),
            addedBy: user.email,
            addedByName: user.displayName,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visaData)
            });

            if (response.ok) {
                toast.success('Visa added successfully!');
                navigate('/my-added-visas');
            } else {
                throw new Error('Failed to add visa');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add visa. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-base-100 py-12 lg:py-16">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <Fade triggerOnce direction="up">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <HiOutlinePlus className="w-4 h-4" />
                                <span>Add New Visa</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-3">
                                Add a New{' '}
                                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Visa Entry
                                </span>
                            </h1>
                            <p className="text-base-content/70">
                                Share visa information to help other travelers
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="card bg-base-200/50 backdrop-blur border border-base-300/50">
                                <div className="card-body">
                                    <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineGlobeAlt className="w-5 h-5 text-primary" />
                                        Country Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Country Name */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Country Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="countryName"
                                                value={formData.countryName}
                                                onChange={handleChange}
                                                placeholder="e.g., United States"
                                                className="input input-bordered"
                                                required
                                            />
                                        </div>

                                        {/* Country Image */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Country Image URL</span>
                                            </label>
                                            <div className="relative">
                                                <HiOutlinePhotograph className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                                <input
                                                    type="url"
                                                    name="countryImage"
                                                    value={formData.countryImage}
                                                    onChange={handleChange}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="input input-bordered w-full pl-12"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200/50 backdrop-blur border border-base-300/50">
                                <div className="card-body">
                                    <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineDocumentText className="w-5 h-5 text-secondary" />
                                        Visa Details
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Visa Type */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Visa Type</span>
                                            </label>
                                            <select
                                                name="visaType"
                                                value={formData.visaType}
                                                onChange={handleChange}
                                                className="select select-bordered"
                                                required
                                            >
                                                <option value="">Select visa type</option>
                                                {visaTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Processing Time */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Processing Time</span>
                                            </label>
                                            <div className="relative">
                                                <HiOutlineClock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                                <input
                                                    type="text"
                                                    name="processingTime"
                                                    value={formData.processingTime}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 5-7 Business Days"
                                                    className="input input-bordered w-full pl-12"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Fee */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Visa Fee (USD)</span>
                                            </label>
                                            <div className="relative">
                                                <HiOutlineCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                                <input
                                                    type="number"
                                                    name="fee"
                                                    value={formData.fee}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 160"
                                                    className="input input-bordered w-full pl-12"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Validity */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Validity Period</span>
                                            </label>
                                            <div className="relative">
                                                <HiOutlineCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                                <input
                                                    type="text"
                                                    name="validity"
                                                    value={formData.validity}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 10 Years"
                                                    className="input input-bordered w-full pl-12"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Age Restriction */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Minimum Age</span>
                                            </label>
                                            <div className="relative">
                                                <HiOutlineUserGroup className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                                <input
                                                    type="number"
                                                    name="ageRestriction"
                                                    value={formData.ageRestriction}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 18"
                                                    className="input input-bordered w-full pl-12"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Application Method */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Application Method</span>
                                            </label>
                                            <select
                                                name="applicationMethod"
                                                value={formData.applicationMethod}
                                                onChange={handleChange}
                                                className="select select-bordered"
                                                required
                                            >
                                                <option value="">Select method</option>
                                                {applicationMethods.map(method => (
                                                    <option key={method} value={method}>{method}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200/50 backdrop-blur border border-base-300/50">
                                <div className="card-body">
                                    <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineClipboardList className="w-5 h-5 text-accent" />
                                        Required Documents
                                        <span className="text-sm font-normal text-base-content/60">(Select at least 3)</span>
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {documentOptions.map(doc => (
                                            <label 
                                                key={doc} 
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                                    formData.requiredDocuments.includes(doc)
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-base-300 hover:border-primary/50'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.requiredDocuments.includes(doc)}
                                                    onChange={() => handleDocumentChange(doc)}
                                                    className="checkbox checkbox-primary checkbox-sm"
                                                />
                                                <span className="text-sm">{doc}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200/50 backdrop-blur border border-base-300/50">
                                <div className="card-body">
                                    <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineDocumentText className="w-5 h-5 text-info" />
                                        Description
                                    </h2>

                                    <div className="form-control">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Provide additional details about this visa..."
                                            className="textarea textarea-bordered h-32 resize-none"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className={`btn btn-primary btn-lg w-full gap-2 ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Adding Visa...' : 'Add Visa'}
                                {!loading && <HiOutlinePlus className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>
                </Fade>
            </div>
        </main>
    );
};

export default AddVisa;
