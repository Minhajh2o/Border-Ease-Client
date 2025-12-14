import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';
import { HiOutlineArrowRight, HiOutlineGlobeAlt, HiOutlineDocumentText } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import bannerGlobal from '../../assets/banner_global.png';
import bannerVisa from '../../assets/banner_visa.png';
import bannerSupport from '../../assets/banner_support.png';

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Your Gateway to",
            highlight: "Global Travel",
            description: "Discover visa requirements for 190+ countries. Fast, reliable, and hassle-free visa processing starts here.",
            emoji: "✈️",
            image: bannerGlobal
        },
        {
            id: 2,
            title: "Simplify Your",
            highlight: "Visa Journey",
            description: "Track your application in real-time, get expert guidance, and receive instant updates on your visa status.",
            emoji: "🛂",
            image: bannerVisa
        },
        {
            id: 3,
            title: "Expert Guidance",
            highlight: "Every Step",
            description: "From document preparation to submission tracking, we're with you throughout your entire visa application process.",
            emoji: "🌍",
            image: bannerSupport
        }
    ];

    return (
        <section className="relative overflow-hidden bg-base-100">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Animated Blobs */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-20 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 pattern-grid text-base-content/5"></div>

                {/* Vector Decorations */}
                <svg className="absolute top-20 right-10 w-24 h-24 text-primary/10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-40 left-10 w-32 h-32 text-secondary/10" viewBox="0 0 100 100">
                    <path d="M20 80 L50 20 L80 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                speed={800}
                className="relative z-10"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="min-h-150 lg:min-h-175">
                            <div className="container max-w-7xl mx-auto px-4 h-full">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-150 lg:min-h-175 py-16 lg:py-20">

                                    {/* Content */}
                                    <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left order-2 lg:order-1">
                                        <div className="w-fit inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                            <HiOutlineGlobeAlt className="w-4 h-4" />
                                            <span>Trusted by 50,000+ Travelers</span>
                                        </div>

                                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight">
                                            {slide.title}
                                            <span className="block text-primary">
                                                {slide.highlight}
                                            </span>
                                        </h1>

                                        <p className="text-base lg:text-lg text-base-content/70 max-w-xl mx-auto lg:mx-0">
                                            {slide.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                            <Link
                                                to="/all-visas"
                                                className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25"
                                            >
                                                Explore Visas
                                                <HiOutlineArrowRight className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                to="/add-visa"
                                                className="btn btn-outline btn-lg gap-2"
                                            >
                                                <HiOutlineDocumentText className="w-5 h-5" />
                                                Add New Visa
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image/Illustration Area */}
                                    <div className="relative order-1 lg:order-2 flex items-center justify-center">
                                        <div className="relative w-full max-w-md lg:max-w-lg group perspective-1000">
                                            {/* Image Container with Float Animation */}
                                            <div className="aspect-square rounded-4xl bg-base-100/50 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl border border-base-200/50 transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-1 animate-float">
                                                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-secondary/5 opacity-50"></div>
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="w-[90%] h-[90%] object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
                                                />
                                            </div>

                                            {/* Floating Elements */}
                                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                                                <span className="text-2xl">✈️</span>
                                            </div>
                                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                                <span className="text-3xl">{slide.emoji}</span>
                                            </div>
                                            <div className="absolute top-1/2 -right-6 w-14 h-14 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                                                <span className="text-xl">🌍</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;
