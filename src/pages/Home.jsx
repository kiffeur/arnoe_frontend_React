import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import CarTypes from '../components/CarTypes';
import RentalCars from '../components/RentalCar';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <CarTypes />
      <RentalCars />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
