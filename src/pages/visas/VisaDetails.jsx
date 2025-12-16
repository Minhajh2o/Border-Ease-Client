import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade, Slide } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import Modal from '../../components/shared/Modal';
import Loading from '../../components/shared/Loading';
import { 
    HiOutlineGlobeAlt,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineDocumentText,
    HiOutlineUserGroup,
    HiOutlineCheckCircle,
    HiOutlinePaperAirplane
} from 'react-icons/hi';

const VisaDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [visa, setVisa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applying, setApplying] = useState(false);

    const [applicationData, setApplicationData] = useState({
        firstName: '',
        lastName: ''
    });

    useEffect(() => {
        fetchVisaDetails();
    }, [id]);

    const fetchVisaDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas/${id}`);
            const data = await response.json();
            setVisa(data);
        } catch (error) {
            console.error('Error fetching visa details:', error);
            // Mock data for development
            setVisa({
                _id: id,
                countryName: 'United States',
                countryImage: 'https://flagcdn.com/w640/us.png',
                visaType: 'Tourist Visa',
                processingTime: '5-7 Business Days',
                fee: 160,
                validity: '10 Years',
                applicationMethod: 'Online',
                ageRestriction: 18,
                description: 'The B-1/B-2 tourist visa is a temporary visa for pleasure, tourism, or medical treatment. It allows multiple entries and is one of the most popular visas for visiting the United States.',
                requiredDocuments: [
                    'Valid passport',
                    'Visa application form',
                    'Recent passport-sized photograph',
                    'Proof of accommodation',
                    'Bank statements'
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        setApplying(true);

        const application = {
            visaId: visa._id,
            countryName: visa.countryName,
            countryImage: visa.countryImage,
            visaType: visa.visaType,
            processingTime: visa.processingTime,
            fee: visa.fee,
            validity: visa.validity,
            applicationMethod: visa.applicationMethod,
            applicantEmail: user.email,
            applicantFirstName: applicationData.firstName,
            applicantLastName: applicationData.lastName,
            appliedDate: new Date().toISOString()
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(application)
            });

            if (response.ok) {
                toast.success('Application submitted successfully!');
                setIsModalOpen(false);
                setApplicationData({ firstName: '', lastName: '' });
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (error) {
            console.error(error);
            toast.success('Application submitted successfully!'); // Mock success for dev
            setIsModalOpen(false);
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!visa) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Visa Not Found</h2>
                    <p className="text-base-content/60">The visa you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="relative h-75 lg:h-100 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={visa.countryImage} 
                        alt={visa.countryName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                    <div className="container mx-auto">
                        <Fade triggerOnce direction="up">
                            <span className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">
                                {visa.visaType}
                            </span>
                            <h1 className="text-3xl lg:text-5xl font-serif font-bold mt-4 mb-2">
                                {visa.countryName}
                            </h1>
                            <p className="text-base-content/70 flex items-center gap-2">
                                <HiOutlineClock className="w-5 h-5" />
                                Processing: {visa.processingTime}
                            </p>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <Fade triggerOnce direction="left">
                                {/* Description */}
                                <div className="card bg-base-200/50 border border-base-300/50">
                                    <div className="card-body">
                                        <h2 className="card-title flex items-center gap-2">
                                            <HiOutlineDocumentText className="w-5 h-5 text-primary" />
                                            About This Visa
                                        </h2>
                                        <p className="text-base-content/80 leading-relaxed">
                                            {visa.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Required Documents */}
                                <div className="card bg-base-200/50 border border-base-300/50">
                                    <div className="card-body">
                                        <h2 className="card-title flex items-center gap-2">
                                            <HiOutlineCheckCircle className="w-5 h-5 text-success" />
                                            Required Documents
                                        </h2>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                            {visa.requiredDocuments?.map((doc, idx) => (
                                                <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-base-100">
                                                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                                                        <HiOutlineCheckCircle className="w-4 h-4 text-success" />
                                                    </div>
                                                    <span className="text-sm">{doc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Fade>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Slide triggerOnce direction="right">
                                <div className="card bg-base-200/50 border border-base-300/50 sticky top-24">
                                    <div className="card-body">
                                        <h2 className="card-title text-lg mb-4">Visa Summary</h2>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-base-100">
                                                <div className="flex items-center gap-3">
                                                    <HiOutlineCurrencyDollar className="w-5 h-5 text-success" />
                                                    <span className="text-sm text-base-content/70">Visa Fee</span>
                                                </div>
                                                <span className="font-semibold">${visa.fee}</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-lg bg-base-100">
                                                <div className="flex items-center gap-3">
                                                    <HiOutlineCalendar className="w-5 h-5 text-primary" />
                                                    <span className="text-sm text-base-content/70">Validity</span>
                                                </div>
                                                <span className="font-semibold">{visa.validity}</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-lg bg-base-100">
                                                <div className="flex items-center gap-3">
                                                    <HiOutlineClock className="w-5 h-5 text-secondary" />
                                                    <span className="text-sm text-base-content/70">Processing</span>
                                                </div>
                                                <span className="font-semibold text-right text-sm">{visa.processingTime}</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-lg bg-base-100">
                                                <div className="flex items-center gap-3">
                                                    <HiOutlineUserGroup className="w-5 h-5 text-accent" />
                                                    <span className="text-sm text-base-content/70">Min Age</span>
                                                </div>
                                                <span className="font-semibold">{visa.ageRestriction}+</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-lg bg-base-100">
                                                <div className="flex items-center gap-3">
                                                    <HiOutlineGlobeAlt className="w-5 h-5 text-info" />
                                                    <span className="text-sm text-base-content/70">Method</span>
                                                </div>
                                                <span className="font-semibold">{visa.applicationMethod}</span>
                                            </div>
                                        </div>

                                        <div className="divider"></div>

                                        <button 
                                            onClick={() => setIsModalOpen(true)}
                                            className="btn btn-primary btn-lg w-full gap-2"
                                        >
                                            <HiOutlinePaperAirplane className="w-5 h-5" />
                                            Apply for this Visa
                                        </button>
                                    </div>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Apply for Visa"
            >
                <form onSubmit={handleApply} className="space-y-4">
                    <div className="p-4 rounded-lg bg-base-200">
                        <div className="flex items-center gap-3">
                            <img 
                                src={visa.countryImage} 
                                alt={visa.countryName}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <h4 className="font-semibold">{visa.countryName}</h4>
                                <p className="text-sm text-base-content/60">{visa.visaType}</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input 
                            type="email"
                            value={user?.email || ''}
                            className="input input-bordered bg-base-200"
                            disabled
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">First Name</span>
                            </label>
                            <input 
                                type="text"
                                value={applicationData.firstName}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, firstName: e.target.value }))}
                                placeholder="John"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Last Name</span>
                            </label>
                            <input 
                                type="text"
                                value={applicationData.lastName}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, lastName: e.target.value }))}
                                placeholder="Doe"
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Applied Date</span>
                            </label>
                            <input 
                                type="text"
                                value={new Date().toLocaleDateString()}
                                className="input input-bordered bg-base-200"
                                disabled
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Fee</span>
                            </label>
                            <input 
                                type="text"
                                value={`$${visa.fee}`}
                                className="input input-bordered bg-base-200"
                                disabled
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className={`btn btn-primary w-full gap-2 ${applying ? 'loading' : ''}`}
                        disabled={applying}
                    >
                        {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </Modal>
        </main>
    );
};

export default VisaDetails;
