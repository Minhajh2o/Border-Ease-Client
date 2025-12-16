import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { 
    HiOutlineMail, 
    HiOutlineLockClosed, 
    HiOutlineEye, 
    HiOutlineEyeOff,
    HiOutlineGlobeAlt
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signIn(email, password);
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success('Welcome!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login with Google.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 pattern-grid text-white/5"></div>
                
                {/* Vector Decorations */}
                <svg className="absolute top-20 left-20 w-32 h-32 text-white/10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
                <svg className="absolute bottom-32 right-20 w-40 h-40 text-white/10" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                </svg>
                <svg className="absolute top-1/2 left-1/3 w-24 h-24 text-white/10" viewBox="0 0 100 100">
                    <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <Fade triggerOnce direction="left">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                <HiOutlineGlobeAlt className="w-7 h-7" />
                            </div>
                            <span className="font-serif text-2xl font-bold">BorderEase</span>
                        </div>
                        
                        <h1 className="text-4xl xl:text-5xl font-serif font-bold mb-6 leading-tight">
                            Welcome back to your visa journey
                        </h1>
                        
                        <p className="text-white/80 text-lg mb-8 max-w-md">
                            Access your applications, track your visa status, and continue exploring opportunities worldwide.
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-4">
                            {['Real-time tracking', 'Secure platform', '24/7 support'].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-xs">✓</span>
                                    </div>
                                    <span className="text-white/90">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </Fade>
                </div>
                
                {/* Bottom Wave */}
                <svg className="absolute bottom-0 left-0 right-0 text-base-100" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,100 C480,0 960,100 1440,50 L1440,100 L0,100 Z"/>
                </svg>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
                <Fade triggerOnce direction="right">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-8">
                            <Link to="/" className="inline-flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                                    <HiOutlineGlobeAlt className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-serif text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    BorderEase
                                </span>
                            </Link>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Sign In</h2>
                            <p className="text-base-content/60">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Register
                                </Link>
                            </p>
                        </div>

                        {/* Google Login */}
                        <button 
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full gap-3 mb-6"
                        >
                            <FcGoogle className="w-5 h-5" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-base-300"></div>
                            <span className="text-sm text-base-content/50">or</span>
                            <div className="flex-1 h-px bg-base-300"></div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full pl-12 pr-12"
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                                    >
                                        {showPassword ? (
                                            <HiOutlineEyeOff className="w-5 h-5" />
                                        ) : (
                                            <HiOutlineEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                <label className="label">
                                    <Link to="/forgot-password" className="label-text-alt link link-hover text-primary">
                                        Forgot password?
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Login;
