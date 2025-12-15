import { Fade, Zoom } from 'react-awesome-reveal';
import { 
    HiOutlineSearch, 
    HiOutlineDocumentAdd, 
    HiOutlinePaperAirplane, 
    HiOutlineBadgeCheck 
} from 'react-icons/hi';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: HiOutlineSearch,
            title: 'Search & Explore',
            description: 'Browse through our comprehensive database of visa requirements for 190+ countries. Filter by visa type, processing time, and more.',
            color: 'primary'
        },
        {
            number: '02',
            icon: HiOutlineDocumentAdd,
            title: 'Prepare Documents',
            description: 'Follow our detailed checklists to gather all required documents. Upload them securely through our platform.',
            color: 'secondary'
        },
        {
            number: '03',
            icon: HiOutlinePaperAirplane,
            title: 'Submit Application',
            description: 'Complete the online application form and submit your documents. Pay the visa fee securely through our platform.',
            color: 'accent'
        },
        {
            number: '04',
            icon: HiOutlineBadgeCheck,
            title: 'Track & Receive',
            description: 'Monitor your application status in real-time. Receive updates and get your visa approval notification.',
            color: 'success'
        }
    ];

    const getGradientColor = (color) => {
        const colors = {
            primary: 'from-primary to-primary/70',
            secondary: 'from-secondary to-secondary/70',
            accent: 'from-accent to-accent/70',
            success: 'from-success to-success/70',
        };
        return colors[color] || colors.primary;
    };

    return (
        <section className="py-16 lg:py-24 bg-base-200 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Curved line connecting steps */}
                <svg className="absolute inset-0 w-full h-full text-primary/5 hidden lg:block" preserveAspectRatio="none">
                    <path 
                        d="M0 50% Q25% 20%, 50% 50% T100% 50%" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        strokeDasharray="10 5"
                    />
                </svg>
                
                {/* Decorative elements */}
                <div className="absolute top-1/4 right-10 w-32 h-32 border-2 border-dashed border-primary/10 rounded-full"></div>
                <div className="absolute bottom-1/4 left-10 w-24 h-24 border-2 border-dashed border-secondary/10 rounded-full"></div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <Fade triggerOnce direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                            <HiOutlinePaperAirplane className="w-4 h-4" />
                            <span>Simple Process</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold">
                            How{' '}
                            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                BorderEase
                            </span>
                            {' '}Works
                        </h2>
                        <p className="text-base-content/70 max-w-2xl mx-auto">
                            Get your visa in four simple steps. Our streamlined process makes international travel planning effortless.
                        </p>
                    </div>
                </Fade>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {steps.map((step, idx) => (
                        <Zoom key={idx} triggerOnce delay={idx * 150}>
                            <div className="relative group">
                                {/* Connector Line (hidden on mobile) */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-linear-to-r from-base-300 to-transparent z-0"></div>
                                )}
                                
                                <div className="relative z-10 text-center">
                                    {/* Step Number & Icon */}
                                    <div className="relative inline-block mb-6">
                                        {/* Background circle */}
                                        <div className={`w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-linear-to-br ${getGradientColor(step.color)} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                            <step.icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                                        </div>
                                        
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-base-100 border-4 border-base-200 flex items-center justify-center shadow-md">
                                            <span className="font-bold text-sm text-base-content">{step.number}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                                    <p className="text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto px-4">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </Zoom>
                    ))}
                </div>

                {/* Bottom CTA */}
                <Fade triggerOnce direction="up" delay={400}>
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-base-100 shadow-lg">
                            <div className="flex -space-x-3">
                                {/* Avatar placeholders - Use actual user photos */}
                                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-base-100 flex items-center justify-center text-xs">👤</div>
                                <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-base-100 flex items-center justify-center text-xs">👤</div>
                                <div className="w-10 h-10 rounded-full bg-accent/20 border-2 border-base-100 flex items-center justify-center text-xs">👤</div>
                                <div className="w-10 h-10 rounded-full bg-primary border-2 border-base-100 flex items-center justify-center text-white text-xs font-medium">+5k</div>
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-sm">Join 50,000+ travelers</p>
                                <p className="text-xs text-base-content/60">Who simplified their visa journey</p>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default HowItWorks;
