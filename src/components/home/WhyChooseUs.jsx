import { Fade } from 'react-awesome-reveal';
import {
    HiOutlineShieldCheck,
    HiOutlineClock,
    HiOutlineSupport,
    HiOutlineClipboardCheck,
    HiOutlineGlobeAlt,
    HiOutlineLightningBolt
} from 'react-icons/hi';

const WhyChooseUs = () => {
    // Features data with grid span configuration for Bento layout
    const features = [
        {
            icon: HiOutlineShieldCheck,
            title: 'Secure & Reliable',
            description: 'Your personal data is protected with bank-level encryption and secure processing standards.',
            iconClass: 'text-primary',
            bgClass: 'bg-primary/10',
            largeIconClass: 'text-primary',
            gridClass: 'lg:col-span-2 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl'
        },
        {
            icon: HiOutlineClock,
            title: 'Fast Processing',
            description: 'Get your visa processed quickly with our streamlined application system.',
            iconClass: 'text-secondary',
            bgClass: 'bg-secondary/10',
            largeIconClass: 'text-secondary',
            gridClass: 'lg:col-span-1 bg-base-200/50 rounded-3xl'
        },
        {
            icon: HiOutlineSupport,
            title: '24/7 Support',
            description: 'Our expert team is always available to assist you with any questions.',
            iconClass: 'text-accent',
            bgClass: 'bg-accent/10',
            largeIconClass: 'text-accent',
            gridClass: 'lg:col-span-1 bg-base-200/50 rounded-3xl'
        },
        {
            icon: HiOutlineLightningBolt,
            title: 'Real-time Tracking',
            description: 'Track your application status instantly from anywhere.',
            iconClass: 'text-accent',
            bgClass: 'bg-accent/10',
            largeIconClass: 'text-accent',
            gridClass: 'lg:col-span-1 bg-base-200/50 rounded-3xl'
        },
        {
            icon: HiOutlineClipboardCheck,
            title: 'Easy Documentation',
            description: 'Clear guidelines and checklists make document preparation simple.',
            iconClass: 'text-info',
            bgClass: 'bg-info/10',
            largeIconClass: 'text-info',
            gridClass: 'lg:col-span-1 bg-base-200/50 rounded-3xl'
        },
        {
            icon: HiOutlineGlobeAlt,
            title: '190+ Countries',
            description: 'Access visa information and applications for countries worldwide, all in one place.',
            iconClass: 'text-success',
            bgClass: 'bg-success/10',
            largeIconClass: 'text-success',
            gridClass: 'lg:col-span-2 bg-gradient-to-r from-success/10 to-transparent rounded-3xl'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-base-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-125 h-125 bg-primary/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-125 h-125 bg-secondary/10 rounded-full blur-[200px] translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            </div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 text-base-content/70 text-sm font-medium mb-6">
                            <HiOutlineShieldCheck className="w-4 h-4 text-primary" />
                            <span>Why Choose BorderEase</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl lg:leading-tight font-serif font-bold mb-6">
                            The Smarter Way into <br className="hidden lg:block" />
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                The World
                            </span>
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            We combine technology with expertise to make your visa application journey seamless, secure, and successful.
                        </p>
                    </div>
                </Fade>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
                    {features.map((feature, idx) => (
                        <Fade
                            key={idx}
                            triggerOnce
                            direction="up"
                            delay={idx * 100}
                            className={`${feature.gridClass} h-full`}
                        >
                            <div className="group relative h-full p-6 lg:p-8 rounded-3xl border border-base-200 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 overflow-hidden flex flex-col justify-between backdrop-blur-sm">
                                {/* Large Background Icon */}
                                <feature.icon className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${feature.largeIconClass} -rotate-12`} />

                                <div>
                                    {/* Icon Box */}
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.iconClass} ${feature.bgClass} group-hover:scale-110 transition-transform duration-500`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base-content/60 leading-relaxed text-sm lg:text-base">
                                        {feature.description}
                                    </p>
                                </div>


                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
