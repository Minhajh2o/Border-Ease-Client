import Navbar from '../components/layout-components/Navbar';
import Footer from '../components/layout-components/Footer';
import BackToTop from '../components/shared/BackToTop';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-base-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default MainLayout;