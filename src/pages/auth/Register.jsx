import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context-provider/AuthContext';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { 
    HiOutlineMail, 
    HiOutlineLockClosed, 
    HiOutlineEye, 
    HiOutlineEyeOff,
    HiOutlineGlobeAlt,
    HiOutlineUser,
    HiOutlinePhotograph
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const { createUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) errors.push('At least 6 characters');
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear errors when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        // Validate password
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors;
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            await createUser(formData.email, formData.password, formData.name, formData.photoURL);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success('Welcome!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to register with Google.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
                <Fade triggerOnce direction="left">
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

                        <div className="text-center mb-6">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Create Account</h2>
                            <p className="text-base-content/60">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        {/* Google Login */}
                        <button 
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full gap-3 mb-4"
                        >
                            <FcGoogle className="w-5 h-5" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-1 h-px bg-base-300"></div>
                            <span className="text-sm text-base-content/50">or</span>
                            <div className="flex-1 h-px bg-base-300"></div>
                        </div>

                        {/* Register Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`input input-bordered w-full pl-12 ${errors.name ? 'input-error' : ''}`}
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    </label>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`input input-bordered w-full pl-12 ${errors.email ? 'input-error' : ''}`}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error">{errors.email}</span>
                                    </label>
                                )}
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium">Photo URL</span>
                                    <span className="label-text-alt text-base-content/50">Optional</span>
                                </label>
                                <div className="relative">
                                    <HiOutlinePhotograph className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        placeholder="Enter photo URL"
                                        className="input input-bordered w-full pl-12"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        className={`input input-bordered w-full pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
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
                                {errors.password && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error">
                                            Missing: {errors.password.join(', ')}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium">Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className={`input input-bordered w-full pl-12 pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                                    >
                                        {showConfirmPassword ? (
                                            <HiOutlineEyeOff className="w-5 h-5" />
                                        ) : (
                                            <HiOutlineEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </Fade>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-bl from-secondary via-secondary/90 to-primary relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 pattern-dots text-white/5"></div>
                
                {/* Vector Decorations */}
                <svg className="absolute top-32 right-20 w-32 h-32 text-white/10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5"/>
                </svg>
                <svg className="absolute bottom-20 left-20 w-40 h-40 text-white/10" viewBox="0 0 100 100">
                    <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <svg className="absolute top-1/2 right-1/4 w-20 h-20 text-white/10" viewBox="0 0 100 100">
                    <rect x="25" y="25" width="50" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <Fade triggerOnce direction="right">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                                <HiOutlineGlobeAlt className="w-7 h-7" />
                            </div>
                            <span className="font-serif text-2xl font-bold">BorderEase</span>
                        </div>
                        
                        <h1 className="text-4xl xl:text-5xl font-serif font-bold mb-6 leading-tight">
                            Start your global adventure today
                        </h1>
                        
                        <p className="text-white/80 text-lg mb-8 max-w-md">
                            Join thousands of travelers who trust BorderEase for their visa needs. Your seamless journey begins here.
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-4">
                            {['190+ countries covered', 'Fast visa processing', 'Track applications 24/7'].map((feature, idx) => (
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
                    <path fill="currentColor" d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z"/>
                </svg>
            </div>
        </div>
    );
};

export default Register;
