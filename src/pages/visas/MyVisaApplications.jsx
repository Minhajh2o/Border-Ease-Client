import { useState, useEffect } from 'react';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade, Zoom } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { 
    HiOutlineSearch,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineGlobeAlt,
    HiOutlineTrash,
    HiOutlineUser,
    HiOutlineMail,
    HiOutlineDocumentText
} from 'react-icons/hi';

const MyVisaApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user?.email) {
            fetchMyApplications();
        }
    }, [user]);

    const fetchMyApplications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/user/${user?.email}`);
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error('Failed to fetch your applications');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (applicationId) => {
        if (!confirm('Are you sure you want to cancel this application?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setApplications(prev => prev.filter(a => a._id !== applicationId));
                toast.success('Application cancelled successfully!');
            } else {
                throw new Error('Failed to cancel application');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to cancel application. Please try again.');
        }
    };

    const filteredApplications = applications.filter(app =>
        app.countryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-base-100 py-12 lg:py-16">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                            <HiOutlineDocumentText className="w-4 h-4" />
                            <span>My Applications</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-3">
                            My Visa{' '}
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Applications
                            </span>
                        </h1>
                        <p className="text-base-content/70">
                            Track and manage your visa applications
                        </p>
                    </div>
                </Fade>

                {/* Search Bar */}
                <Fade triggerOnce direction="up" delay={100}>
                    <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                type="text"
                                placeholder="Search by country name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-12"
                            />
                        </div>
                    </div>
                </Fade>

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="card bg-base-200 animate-pulse">
                                <div className="card-body">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 bg-base-300 rounded-xl"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-6 bg-base-300 rounded w-1/2"></div>
                                            <div className="h-4 bg-base-300 rounded w-3/4"></div>
                                            <div className="h-4 bg-base-300 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
                            <HiOutlineSearch className="w-10 h-10 text-base-content/40" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {searchTerm ? 'No applications found' : 'No applications yet'}
                        </h3>
                        <p className="text-base-content/60 mb-6">
                            {searchTerm 
                                ? `No applications found for "${searchTerm}"`
                                : 'Start your visa journey by applying for a visa'
                            }
                        </p>
                        {!searchTerm && (
                            <a href="/all-visas" className="btn btn-primary">Explore Visas</a>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredApplications.map((application, idx) => (
                            <Zoom key={application._id} triggerOnce delay={idx * 100}>
                                <div className="card bg-base-200/50 border border-base-300/50">
                                    <div className="card-body">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Country Image */}
                                            <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden">
                                                <img 
                                                    src={application.countryImage} 
                                                    alt={application.countryName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                                                            {application.visaType}
                                                        </span>
                                                        <h3 className="text-xl font-bold mt-2">{application.countryName}</h3>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 mt-4">
                                                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                        <HiOutlineClock className="w-4 h-4 text-primary shrink-0" />
                                                        <span className="truncate">{application.processingTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                        <HiOutlineCurrencyDollar className="w-4 h-4 text-success shrink-0" />
                                                        <span>${application.fee}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                        <HiOutlineCalendar className="w-4 h-4 text-secondary shrink-0" />
                                                        <span className="truncate">{application.validity}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                        <HiOutlineGlobeAlt className="w-4 h-4 text-accent shrink-0" />
                                                        <span>{application.applicationMethod}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Applicant Info */}
                                        <div className="divider my-3"></div>
                                        
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-base-content/70">
                                                    <HiOutlineUser className="w-4 h-4" />
                                                    <span>{application.applicantFirstName} {application.applicantLastName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-base-content/70">
                                                    <HiOutlineMail className="w-4 h-4" />
                                                    <span className="truncate max-w-37.5">{application.applicantEmail}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-base-content/70">
                                                    <HiOutlineCalendar className="w-4 h-4" />
                                                    <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => handleCancel(application._id)}
                                                className="btn btn-error btn-outline btn-sm gap-2"
                                            >
                                                <HiOutlineTrash className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {!loading && filteredApplications.length > 0 && (
                    <div className="text-center mt-8 text-base-content/60">
                        Showing {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
                        {searchTerm && ` for "${searchTerm}"`}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyVisaApplications;
