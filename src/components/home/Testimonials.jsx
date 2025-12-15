import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { HiOutlineStar } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Travel Blogger',
            avatar: null,
            rating: 5,
            review: 'BorderEase made my visa application for Japan incredibly smooth. The step-by-step guidance and document checklist saved me hours of research. Highly recommended!',
            country: 'USA',
            visaType: 'Tourist Visa',
            destination: 'Japan'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Business Executive',
            avatar: null,
            rating: 5,
            review: 'As someone who travels frequently for business, BorderEase has become my go-to platform. The real-time tracking feature gives me peace of mind.',
            country: 'Singapore',
            visaType: 'Business Visa',
            destination: 'Multiple Countries'
        },
        {
            id: 3,
            name: 'Emma Williams',
            role: 'Graduate Student',
            avatar: null,
            rating: 5,
            review: 'Got my student visa for Germany processed without any hassle. The support team was incredibly helpful in answering all my questions.',
            country: 'UK',
            visaType: 'Student Visa',
            destination: 'Germany'
        },
        {
            id: 4,
            name: 'David Kumar',
            role: 'Software Engineer',
            avatar: null,
            rating: 4,
            review: 'The platform is intuitive and the visa information is always up-to-date. Saved me from making costly mistakes on my work visa application.',
            country: 'India',
            visaType: 'Work Visa',
            destination: 'Canada'
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Photographer',
            avatar: null,
            rating: 5,
            review: 'I travel to different countries for photo shoots and BorderEase has simplified my visa applications tremendously. The 24/7 support is a game-changer!',
            country: 'Australia',
            visaType: 'Tourist Visa',
            destination: 'Thailand'
        },
        {
            id: 6,
            name: 'Carlos Rodriguez',
            role: 'Marketing Director',
            avatar: null,
            rating: 5,
            review: 'Exceptional service! Applied for my Schengen visa and received it in record time. The document verification feature ensured I had everything right the first time.',
            country: 'Mexico',
            visaType: 'Schengen Visa',
            destination: 'France'
        },
        {
            id: 7,
            name: 'Aisha Patel',
            role: 'Medical Doctor',
            avatar: null,
            rating: 5,
            review: 'As a healthcare professional, I have limited time for paperwork. BorderEase handled my conference visa seamlessly. Will definitely use again!',
            country: 'UAE',
            visaType: 'Conference Visa',
            destination: 'USA'
        },
        {
            id: 8,
            name: 'Thomas Mueller',
            role: 'Retired Teacher',
            avatar: null,
            rating: 5,
            review: 'At 65, I was worried about the digital process, but BorderEase made it so simple. Their phone support walked me through every step of my Australia visa.',
            country: 'Germany',
            visaType: 'Tourist Visa',
            destination: 'Australia'
        },
        {
            id: 9,
            name: 'Yuki Tanaka',
            role: 'Fashion Designer',
            avatar: null,
            rating: 5,
            review: 'Applied for multiple visas for fashion weeks around the world. BorderEase keeps track of all my applications and reminds me about renewals. Brilliant!',
            country: 'Japan',
            visaType: 'Business Visa',
            destination: 'Italy'
        },
        {
            id: 10,
            name: 'James O\'Brien',
            role: 'Film Producer',
            avatar: null,
            rating: 4,
            review: 'Our production team needed visas for 15 crew members. BorderEase handled the bulk application professionally and efficiently. Saved us weeks of work!',
            country: 'Ireland',
            visaType: 'Work Visa',
            destination: 'South Africa'
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, idx) => (
            <HiOutlineStar
                key={idx}
                className={`w-4 h-4 ${idx < rating ? 'text-yellow-400 fill-yellow-400' : 'text-base-content/20'}`}
            />
        ));
    };

    // Calculate dots to show (max 7)
    const totalDots = Math.min(7, testimonials.length);


    const isActiveDot = (dotIndex) => {
        if (testimonials.length <= 7) {
            return dotIndex === activeIndex;
        }
        // Map activeIndex to dot position
        const ratio = activeIndex / (testimonials.length - 1);
        const activeDotPosition = Math.round(ratio * (totalDots - 1));
        return dotIndex === activeDotPosition;
    };

    return (
        <section className="py-16 lg:py-24 testimonials-section relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
                {/* Decorative shapes */}
                <div className="absolute top-20 right-20 w-32 h-32 border-4 border-primary/10 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-secondary/10 rounded-2xl rotate-45"></div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium">
                            <HiOutlineStar className="w-4 h-4" />
                            <span>Testimonials</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold">
                            What Our{' '}
                            <span className="text-primary">
                                Travelers Say
                            </span>
                        </h2>
                        <p className="text-base-content/70 max-w-2xl mx-auto">
                            Join thousands of satisfied travelers who have simplified their visa journey with BorderEase.
                        </p>
                    </div>
                </Fade>

                {/* 3D Testimonials Carousel */}
                <div className="relative max-w-6xl mx-auto">
                    <Swiper
                        onSwiper={setSwiperRef}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1}
                        initialSlide={1}
                        loop={true}
                        speed={600}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 200,
                            modifier: 1.5,
                            slideShadows: false
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 2.5 },
                            1280: { slidesPerView: 3 }
                        }}
                        className="testimonials-3d-slider py-8"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="testimonial-slide">
                                <div className="testimonial-card rounded-3xl p-6 lg:p-8 shadow-xl transform transition-all duration-500 h-full min-h-80 flex flex-col">
                                    {/* Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                                            {testimonial.visaType}
                                        </span>
                                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                                            {testimonial.destination}
                                        </span>
                                    </div>

                                    {/* Review Title & Content */}
                                    <h3 className="text-lg font-bold mb-2">
                                        Amazing Experience
                                    </h3>
                                    <p className="testimonial-text text-sm leading-relaxed grow">
                                        {testimonial.review}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex gap-1 my-4">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Divider */}
                                    <div className="testimonial-divider pt-4 mt-auto">
                                        {/* Author */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                                                <p className="testimonial-meta text-xs">
                                                    {testimonial.role} • {testimonial.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Dot Navigation */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        {[...Array(totalDots)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (testimonials.length <= 7) {
                                        swiperRef?.slideToLoop(idx);
                                    } else {
                                        const targetIndex = Math.round((idx / (totalDots - 1)) * (testimonials.length - 1));
                                        swiperRef?.slideToLoop(targetIndex);
                                    }
                                }}
                                className={`transition-all duration-300 rounded-full ${isActiveDot(idx)
                                        ? 'w-8 h-3 bg-primary'
                                        : 'w-3 h-3 bg-base-content/20 hover:bg-base-content/40'
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <Fade triggerOnce direction="up" delay={200}>
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                        <div className="text-center">
                            <p className="text-3xl lg:text-4xl font-bold text-primary">4.9</p>
                            <div className="flex justify-center gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <HiOutlineStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-base-content/60 mt-1">Average Rating</p>
                        </div>
                        <div className="w-px h-12 bg-base-300 hidden sm:block"></div>
                        <div className="text-center">
                            <p className="text-3xl lg:text-4xl font-bold text-secondary">12,000+</p>
                            <p className="text-sm text-base-content/60 mt-1">Reviews</p>
                        </div>
                        <div className="w-px h-12 bg-base-300 hidden sm:block"></div>
                        <div className="text-center">
                            <p className="text-3xl lg:text-4xl font-bold text-accent">98%</p>
                            <p className="text-sm text-base-content/60 mt-1">Would Recommend</p>
                        </div>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default Testimonials;
