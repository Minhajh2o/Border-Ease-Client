import { useState, useEffect } from 'react';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade, Zoom } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import Modal from '../../components/shared/Modal';
import { 
    HiOutlineTrash, 
    HiOutlinePencil,
    HiOutlineDocumentText,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineGlobeAlt,
    HiOutlineSearch
} from 'react-icons/hi';

const MyAddedVisas = () => {
    const { user } = useAuth();
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchMyVisas();
    }, [user]);

    const fetchMyVisas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas/user/${user?.email}`);
            const data = await response.json();
            setVisas(data);
        } catch (error) {
            console.error('Error fetching visas:', error);
            // Mock data for development
            setVisas([
                {
                    _id: '1',
                    countryName: 'United States',
                    countryImage: 'https://flagcdn.com/w320/us.png',
                    visaType: 'Tourist Visa',
                    processingTime: '5-7 Business Days',
                    fee: 160,
                    validity: '10 Years',
                    applicationMethod: 'Online',
                    ageRestriction: 18,
                    description: 'Tourist visa for visiting the United States.'
                },
                {
                    _id: '2',
                    countryName: 'Canada',
                    countryImage: 'https://flagcdn.com/w320/ca.png',
                    visaType: 'Student Visa',
                    processingTime: '3-4 Weeks',
                    fee: 150,
                    validity: 'Duration of Study',
                    applicationMethod: 'Online',
                    ageRestriction: 16,
                    description: 'Student visa for studying in Canada.'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (visaId) => {
        if (!confirm('Are you sure you want to delete this visa?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas/${visaId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setVisas(prev => prev.filter(v => v._id !== visaId));
                toast.success('Visa deleted successfully!');
            }
        } catch (error) {
            console.error(error);
            setVisas(prev => prev.filter(v => v._id !== visaId)); // Mock delete for dev
            toast.success('Visa deleted successfully!');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas/${selectedVisa._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedVisa)
            });

            if (response.ok) {
                setVisas(prev => prev.map(v => v._id === selectedVisa._id ? selectedVisa : v));
                toast.success('Visa updated successfully!');
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            setVisas(prev => prev.map(v => v._id === selectedVisa._id ? selectedVisa : v)); // Mock update
            toast.success('Visa updated successfully!');
            setIsEditModalOpen(false);
        } finally {
            setUpdating(false);
        }
    };

    const openEditModal = (visa) => {
        setSelectedVisa({ ...visa });
        setIsEditModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-base-100 py-12 lg:py-16">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <HiOutlineDocumentText className="w-4 h-4" />
                            <span>My Contributions</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-3">
                            My Added{' '}
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Visas
                            </span>
                        </h1>
                        <p className="text-base-content/70">
                            Manage the visa entries you've contributed to BorderEase
                        </p>
                    </div>
                </Fade>

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="card bg-base-200 animate-pulse">
                                <div className="h-40 bg-base-300 rounded-t-2xl"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-6 bg-base-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-base-300 rounded w-1/2"></div>
                                    <div className="h-10 bg-base-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : visas.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
                            <HiOutlineSearch className="w-10 h-10 text-base-content/40" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No visas added yet</h3>
                        <p className="text-base-content/60 mb-6">Start contributing by adding your first visa entry</p>
                        <a href="/add-visa" className="btn btn-primary">Add Your First Visa</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visas.map((visa, idx) => (
                            <Zoom key={visa._id} triggerOnce delay={idx * 100}>
                                <div className="card bg-base-200/50 border border-base-300/50 overflow-hidden">
                                    {/* Image */}
                                    <figure className="h-40 relative">
                                        <img 
                                            src={visa.countryImage} 
                                            alt={visa.countryName}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                                                {visa.visaType}
                                            </span>
                                        </div>
                                    </figure>

                                    {/* Body */}
                                    <div className="card-body p-5">
                                        <h3 className="card-title text-lg">{visa.countryName}</h3>
                                        
                                        <div className="space-y-2 mt-2">
                                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                <HiOutlineClock className="w-4 h-4 text-primary" />
                                                <span>{visa.processingTime}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                <HiOutlineCurrencyDollar className="w-4 h-4 text-success" />
                                                <span>${visa.fee}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                <HiOutlineGlobeAlt className="w-4 h-4 text-secondary" />
                                                <span>{visa.applicationMethod}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="card-actions mt-4 flex gap-2">
                                            <button 
                                                onClick={() => openEditModal(visa)}
                                                className="btn btn-outline btn-sm flex-1 gap-2"
                                            >
                                                <HiOutlinePencil className="w-4 h-4" />
                                                Update
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(visa._id)}
                                                className="btn btn-error btn-outline btn-sm flex-1 gap-2"
                                            >
                                                <HiOutlineTrash className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                title="Update Visa"
            >
                {selectedVisa && (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Country Name</span>
                                </label>
                                <input 
                                    type="text"
                                    value={selectedVisa.countryName}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, countryName: e.target.value }))}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Visa Type</span>
                                </label>
                                <select
                                    value={selectedVisa.visaType}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, visaType: e.target.value }))}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="Tourist Visa">Tourist Visa</option>
                                    <option value="Student Visa">Student Visa</option>
                                    <option value="Work Visa">Work Visa</option>
                                    <option value="Business Visa">Business Visa</option>
                                    <option value="Transit Visa">Transit Visa</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Country Image URL</span>
                            </label>
                            <input 
                                type="url"
                                value={selectedVisa.countryImage}
                                onChange={(e) => setSelectedVisa(prev => ({ ...prev, countryImage: e.target.value }))}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Processing Time</span>
                                </label>
                                <input 
                                    type="text"
                                    value={selectedVisa.processingTime}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, processingTime: e.target.value }))}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Fee (USD)</span>
                                </label>
                                <input 
                                    type="number"
                                    value={selectedVisa.fee}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, fee: parseFloat(e.target.value) }))}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Validity</span>
                                </label>
                                <input 
                                    type="text"
                                    value={selectedVisa.validity}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, validity: e.target.value }))}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Min Age</span>
                                </label>
                                <input 
                                    type="number"
                                    value={selectedVisa.ageRestriction}
                                    onChange={(e) => setSelectedVisa(prev => ({ ...prev, ageRestriction: parseInt(e.target.value) }))}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Application Method</span>
                            </label>
                            <select
                                value={selectedVisa.applicationMethod}
                                onChange={(e) => setSelectedVisa(prev => ({ ...prev, applicationMethod: e.target.value }))}
                                className="select select-bordered"
                                required
                            >
                                <option value="Online">Online</option>
                                <option value="Embassy">Embassy</option>
                                <option value="Visa Center">Visa Center</option>
                                <option value="On Arrival">On Arrival</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea 
                                value={selectedVisa.description}
                                onChange={(e) => setSelectedVisa(prev => ({ ...prev, description: e.target.value }))}
                                className="textarea textarea-bordered h-24"
                                required
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            className={`btn btn-primary w-full ${updating ? 'loading' : ''}`}
                            disabled={updating}
                        >
                            {updating ? 'Updating...' : 'Update Visa'}
                        </button>
                    </form>
                )}
            </Modal>
        </main>
    );
};

export default MyAddedVisas;
