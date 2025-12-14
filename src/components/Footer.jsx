import { Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import { 
    HiOutlineGlobeAlt, 
    HiOutlineMail, 
    HiOutlinePhone, 
    HiOutlineLocationMarker 
} from 'react-icons/hi';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedinIn 
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/all-visas', label: 'All Visas' },
        { path: '/add-visa', label: 'Add Visa' },
    ];

    const visaTypes = [
        'Tourist Visa',
        'Student Visa',
        'Business Visa',
        'Work Visa',
        'Transit Visa',
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: '#', label: 'Facebook' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
        { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    ];

    return (
        <Fade triggerOnce direction="up" duration={600}>
            <footer className="relative bg-base-200 border-t border-base-300/50 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4">
                    <div className="w-full h-full bg-secondary/5 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute top-20 right-20 w-20 h-20 border-2 border-primary/10 rounded-full opacity-50"></div>
                <div className="absolute bottom-32 left-32 w-12 h-12 border-2 border-secondary/10 rounded-lg rotate-45 opacity-50"></div>
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent/20 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-primary/10 rounded-full"></div>

                <div className="container max-w-7xl mx-auto px-4 py-12 lg:py-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg">
                                    <HiOutlineGlobeAlt className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <span className="font-serif text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        BorderEase
                                    </span>
                                    <p className="text-xs text-base-content/50">Your Visa Navigator</p>
                                </div>
                            </Link>
                            <p className="text-sm text-base-content/70 leading-relaxed">
                                Simplifying your visa journey with comprehensive information, easy applications, and real-time tracking. Your gateway to seamless international travel.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-full bg-base-300/50 flex items-center justify-center text-base-content/60 hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            to={link.path}
                                            className="text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visa Types */}
                        <div>
                            <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-secondary rounded-full"></span>
                                Visa Types
                            </h3>
                            <ul className="space-y-3">
                                {visaTypes.map((type, idx) => (
                                    <li key={idx}>
                                        <span className="text-sm text-base-content/70 inline-flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/40"></span>
                                            {type}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-accent rounded-full"></span>
                                Contact Us
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <HiOutlineLocationMarker className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm text-base-content/70">
                                        123 Visa Street, Immigration Tower<br />
                                        New York, NY 10001
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                                        <HiOutlinePhone className="w-4 h-4 text-secondary" />
                                    </div>
                                    <span className="text-sm text-base-content/70">
                                        +1 (555) 123-4567
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                        <HiOutlineMail className="w-4 h-4 text-accent" />
                                    </div>
                                    <span className="text-sm text-base-content/70">
                                        support@borderease.com
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-base-300/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-base-content/60">
                                © {currentYear} BorderEase. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-base-content/60 hover:text-primary transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-base-content/60 hover:text-primary transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-sm text-base-content/60 hover:text-primary transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fade>
    );
};

export default Footer;