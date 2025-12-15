import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Fade, Zoom } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';
import VisaCard from '../shared/VisaCard';
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi';

const LatestVisas = () => {
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for development
    const mockVisas = [
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
        }
    ];

    useEffect(() => {
        // Fetch latest 6 visas from API with timeout
        const fetchLatestVisas = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/visas?limit=6`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                const data = await response.json();
                if (data && data.length > 0) {
                    setVisas(data);
                } else {
                    setVisas(mockVisas);
                }
            } catch (error) {
                console.log('Using mock data - API not available', error);
                setVisas(mockVisas);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestVisas();
    }, []);

    return (
        <section className="py-16 lg:py-24 bg-base-200 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Dotted pattern */}
                <div className="absolute inset-0 pattern-dots text-base-content/3"></div>
                
                {/* Vector decorations */}
                <svg className="absolute top-10 left-10 w-40 h-40 text-primary/5" viewBox="0 0 200 200">
                    <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <svg className="absolute bottom-20 right-20 w-32 h-32 text-secondary/5" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5"/>
                </svg>
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <HiOutlineSparkles className="w-4 h-4" />
                            <span>Latest Additions</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold">
                            Explore Latest{' '}
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Visa Options
                            </span>
                        </h2>
                        <p className="text-base-content/70 max-w-2xl mx-auto">
                            Discover the newest visa opportunities from around the world. Stay updated with the latest requirements and processing times.
                        </p>
                    </div>
                </Fade>

                {/* Visa Cards Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="card bg-base-100 shadow-md animate-pulse">
                                <div className="h-48 bg-base-300 rounded-t-2xl"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-base-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-base-300 rounded w-1/2"></div>
                                    <div className="h-4 bg-base-300 rounded w-full"></div>
                                    <div className="h-10 bg-base-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {visas.map((visa, idx) => (
                            <Zoom key={visa._id} triggerOnce delay={idx * 100}>
                                <VisaCard visa={visa} />
                            </Zoom>
                        ))}
                    </div>
                )}

                {/* See All Button */}
                <Fade triggerOnce direction="up" delay={300}>
                    <div className="text-center mt-12">
                        <Link 
                            to="/all-visas"
                            className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25"
                            data-tooltip-id="see-all-tooltip"
                            data-tooltip-content="Browse all available visas"
                        >
                            See All Visas
                            <HiOutlineArrowRight className="w-5 h-5" />
                        </Link>
                        <Tooltip id="see-all-tooltip" place="bottom" />
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default LatestVisas;
