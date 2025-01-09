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
      <div id="benefits">
        <Benefits />
      </div>
      <div id="car-types">
        <CarTypes />
      </div>
      <div id="rental-cars">
        <RentalCars />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
