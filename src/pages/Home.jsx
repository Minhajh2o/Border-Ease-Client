import Banner from "../components/home/Banner";
import LatestVisas from "../components/home/LatestVisas";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <LatestVisas />
            <WhyChooseUs />
            <HowItWorks />
            <Testimonials />
        </div>
    );
};

export default Home;