import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useTheme } from '../../context-provider/ThemeContext';
import { useAuth } from '../../context-provider/AuthContext';
import { Tooltip } from 'react-tooltip';
import { Fade } from 'react-awesome-reveal';
import { 
    HiOutlineMenu, 
    HiOutlineX, 
    HiOutlineSun, 
    HiOutlineMoon,
    HiOutlineGlobeAlt,
    HiOutlineLogout,
    HiOutlineUser
} from 'react-icons/hi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/all-visas', label: 'All Visas' },
    ];

    const privateLinks = [
        { path: '/add-visa', label: 'Add Visa' },
        { path: '/my-added-visas', label: 'My Added Visas' },
        { path: '/my-visa-applications', label: 'My Applications' },
    ];

    const NavLinkStyle = ({ isActive }) => 
        `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
        ${isActive 
            ? 'text-primary bg-primary/10' 
            : 'text-base-content/70 hover:text-primary hover:bg-primary/5'
        }`;

    return (
        <Fade triggerOnce direction="down" duration={600}>
            <nav className="sticky top-0 z-50 w-full border-b border-base-300/50 bg-base-100/80 backdrop-blur-lg">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg group-hover:shadow-primary/25 transition-shadow">
                                <HiOutlineGlobeAlt className="w-6 h-6 text-white" />
                                {/* Decorative dot */}
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-base-100"></span>
                            </div>
                            <div className="hidden sm:block">
                                <span className="font-serif text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    BorderEase
                                </span>
                                <p className="text-[10px] text-base-content/50 -mt-1">Visa Navigator</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map(link => (
                                <NavLink 
                                    key={link.path} 
                                    to={link.path} 
                                    className={NavLinkStyle}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {user && privateLinks.map(link => (
                                <NavLink 
                                    key={link.path} 
                                    to={link.path} 
                                    className={NavLinkStyle}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Side - Theme Toggle & Auth */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button 
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-circle btn-sm"
                                data-tooltip-id="theme-tooltip"
                                data-tooltip-content={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                            >
                                {theme === 'light' ? (
                                    <HiOutlineMoon className="w-5 h-5" />
                                ) : (
                                    <HiOutlineSun className="w-5 h-5 text-yellow-400" />
                                )}
                            </button>
                            <Tooltip id="theme-tooltip" place="left" />

                            {/* Auth Section */}
                            {user ? (
                                <div className="hidden sm:flex items-center gap-3">
                                    {/* User Avatar */}
                                    <div 
                                        className="avatar cursor-pointer"
                                        data-tooltip-id="user-tooltip"
                                        data-tooltip-content={user.displayName || 'User'}
                                    >
                                        <div className="w-9 h-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt={user.displayName} />
                                            ) : (
                                                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                    <HiOutlineUser className="w-5 h-5 text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Tooltip id="user-tooltip" place="bottom" />
                                    
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogout}
                                        className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/10"
                                    >
                                        <HiOutlineLogout className="w-4 h-4" />
                                        <span className="hidden md:inline">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link to="/login" className="btn btn-ghost btn-sm">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-primary btn-sm">
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden btn btn-ghost btn-circle btn-sm"
                            >
                                {isMenuOpen ? (
                                    <HiOutlineX className="w-6 h-6" />
                                ) : (
                                    <HiOutlineMenu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <div className="container max-w-6xl mx-auto px-4 py-4 space-y-2 border-t border-base-300/50">
                        {navLinks.map(link => (
                            <NavLink 
                                key={link.path} 
                                to={link.path} 
                                className={({ isActive }) => 
                                    `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-200'}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        
                        {user && privateLinks.map(link => (
                            <NavLink 
                                key={link.path} 
                                to={link.path} 
                                className={({ isActive }) => 
                                    `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-200'}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {/* Mobile Auth */}
                        <div className="pt-4 border-t border-base-300/50">
                            {user ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt={user.displayName} />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                        <HiOutlineUser className="w-5 h-5 text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{user.displayName}</p>
                                            <p className="text-xs text-base-content/50">{user.email}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="btn btn-ghost btn-sm text-error"
                                    >
                                        <HiOutlineLogout className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link 
                                        to="/login" 
                                        className="btn btn-ghost flex-1"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="btn btn-primary flex-1"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </Fade>
    );
};

export default Navbar;