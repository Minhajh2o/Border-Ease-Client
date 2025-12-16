import { useState, useEffect } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import VisaCard from '../../components/shared/VisaCard';
import { HiOutlineFilter, HiOutlineGlobeAlt, HiOutlineSearch } from 'react-icons/hi';

const AllVisas = () => {
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('All');

    const visaTypes = ['All', 'Tourist Visa', 'Student Visa', 'Work Visa', 'Business Visa', 'Transit Visa', 'Official Visa'];

    useEffect(() => {
        fetchVisas();
    }, []);

    const fetchVisas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/visas`);
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
                    applicationMethod: 'Online'
                },
                {
                    _id: '2',
                    countryName: 'Canada',
                    countryImage: 'https://flagcdn.com/w320/ca.png',
                    visaType: 'Student Visa',
                    processingTime: '3-4 Weeks',
                    fee: 150,
                    validity: 'Duration of Study',
                    applicationMethod: 'Online'
                },
                {
                    _id: '3',
                    countryName: 'United Kingdom',
                    countryImage: 'https://flagcdn.com/w320/gb.png',
                    visaType: 'Work Visa',
                    processingTime: '3 Weeks',
                    fee: 363,
                    validity: '5 Years',
                    applicationMethod: 'Online'
                },
                {
                    _id: '4',
                    countryName: 'Australia',
                    countryImage: 'https://flagcdn.com/w320/au.png',
                    visaType: 'Tourist Visa',
                    processingTime: '20 Days',
                    fee: 145,
                    validity: '1 Year',
                    applicationMethod: 'Online'
                },
                {
                    _id: '5',
                    countryName: 'Japan',
                    countryImage: 'https://flagcdn.com/w320/jp.png',
                    visaType: 'Tourist Visa',
                    processingTime: '5 Days',
                    fee: 25,
                    validity: '90 Days',
                    applicationMethod: 'Embassy'
                },
                {
                    _id: '6',
                    countryName: 'Germany',
                    countryImage: 'https://flagcdn.com/w320/de.png',
                    visaType: 'Student Visa',
                    processingTime: '6-8 Weeks',
                    fee: 75,
                    validity: 'Duration of Study',
                    applicationMethod: 'Embassy'
                },
                {
                    _id: '7',
                    countryName: 'France',
                    countryImage: 'https://flagcdn.com/w320/fr.png',
                    visaType: 'Business Visa',
                    processingTime: '15 Days',
                    fee: 99,
                    validity: '1 Year',
                    applicationMethod: 'Online'
                },
                {
                    _id: '8',
                    countryName: 'Singapore',
                    countryImage: 'https://flagcdn.com/w320/sg.png',
                    visaType: 'Transit Visa',
                    processingTime: '3 Days',
                    fee: 30,
                    validity: '96 Hours',
                    applicationMethod: 'Online'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredVisas = filterType === 'All' 
        ? visas 
        : visas.filter(visa => visa.visaType === filterType);

    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="relative py-16 lg:py-24 bg-linear-to-br from-primary/5 via-base-100 to-secondary/5 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-dashed border-primary/10 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-dashed border-secondary/10 rounded-full"></div>
                    <svg className="absolute top-1/4 right-1/4 w-16 h-16 text-primary/10" viewBox="0 0 100 100">
                        <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Fade triggerOnce direction="up">
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <HiOutlineGlobeAlt className="w-4 h-4" />
                                <span>Explore Worldwide</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-4">
                                All{' '}
                                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Visa Options
                                </span>
                            </h1>
                            <p className="text-base-content/70">
                                Browse through our comprehensive collection of visa options from countries around the world.
                            </p>
                        </div>
                    </Fade>

                    {/* Filter Section */}
                    <Fade triggerOnce direction="up" delay={100}>
                        <div className="mt-8 flex flex-wrap justify-center gap-2">
                            <div className="flex items-center gap-2 mr-4 text-base-content/60">
                                <HiOutlineFilter className="w-5 h-5" />
                                <span className="text-sm font-medium">Filter by:</span>
                            </div>
                            {visaTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        filterType === type
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </Fade>
                </div>
            </section>

            {/* Visas Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, idx) => (
                                <div key={idx} className="card bg-base-200 animate-pulse">
                                    <div className="h-48 bg-base-300 rounded-t-2xl"></div>
                                    <div className="p-5 space-y-4">
                                        <div className="h-6 bg-base-300 rounded w-3/4"></div>
                                        <div className="h-4 bg-base-300 rounded w-1/2"></div>
                                        <div className="h-10 bg-base-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredVisas.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
                                <HiOutlineSearch className="w-10 h-10 text-base-content/40" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No visas found</h3>
                            <p className="text-base-content/60">Try changing your filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredVisas.map((visa, idx) => (
                                <Zoom key={visa._id} triggerOnce delay={idx * 50}>
                                    <VisaCard visa={visa} />
                                </Zoom>
                            ))}
                        </div>
                    )}

                    {/* Results Count */}
                    {!loading && filteredVisas.length > 0 && (
                        <div className="text-center mt-8 text-base-content/60">
                            Showing {filteredVisas.length} {filteredVisas.length === 1 ? 'visa' : 'visas'}
                            {filterType !== 'All' && ` for ${filterType}`}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AllVisas;
