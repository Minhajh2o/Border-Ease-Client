import { Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi';

const NotFound = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-24">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
                
                {/* Vector decorations */}
                <svg className="absolute top-10 md:top-20 right-10 md:right-20 w-24 h-24 text-primary/10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5"/>
                </svg>
                <svg className="absolute bottom-20 md:bottom-32 left-10 md:left-32 w-20 h-20 text-secondary/10" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                </svg>
            </div>

            <Fade triggerOnce>
                <div className="text-center relative z-10">
                    {/* 404 Number */}
                    <div className="relative inline-block mb-8">
                        <span className="text-[150px] lg:text-[200px] font-serif font-bold bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
                            404
                        </span>
                        {/* Decorative elements */}
                        <div className="absolute top-0 md:top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                            <span className="text-2xl">🌍</span>
                        </div>
                        {/* Flying plane animation */}
                        <div 
                            className="absolute top-1/2 left-1/2 w-10 h-10"
                            style={{
                                animation: 'orbit 8s linear infinite',
                            }}
                        >
                            <span 
                                className="text-2xl inline-block"
                                style={{
                                    animation: 'planeRotate 8s linear infinite',
                                }}
                            >✈️</span>
                        </div>
                    </div>

                    {/* Keyframe animations */}
                    <style>{`
                        @keyframes orbit {
                            from {
                                transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
                            }
                            to {
                                transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
                            }
                        }
                        @keyframes planeRotate {
                            0% { transform: rotate(90deg); }
                            25% { transform: rotate(180deg); }
                            50% { transform: rotate(270deg); }
                            75% { transform: rotate(360deg); }
                            100% { transform: rotate(450deg); }
                        }
                    `}</style>

                    {/* Content */}
                    <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-base-content/70 max-w-md mx-auto mb-8">
                        Oops! It seems like you've ventured off the map. The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="btn btn-primary gap-2">
                            <HiOutlineHome className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="btn btn-outline gap-2"
                        >
                            <HiOutlineArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>

                    {/* Helpful Links */}
                    <div className="mt-12 pt-8 border-t border-base-300">
                        <p className="text-sm text-base-content/50 mb-4">Perhaps you were looking for:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/all-visas" className="text-primary hover:underline text-sm">
                                All Visas
                            </Link>
                            <Link to="/add-visa" className="text-primary hover:underline text-sm">
                                Add Visa
                            </Link>
                            <Link to="/login" className="text-primary hover:underline text-sm">
                                Login
                            </Link>
                            <Link to="/register" className="text-primary hover:underline text-sm">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </Fade>
        </main>
    );
};

export default NotFound;
