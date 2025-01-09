import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import Search from './pages/Search';
import CarDetail from './pages/CarDetail';
import BookingSummary from './pages/BookingSummary';
import Accommodation from './pages/Accommodation';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import AddCar from './pages/admin/AddCar';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard';
import AdminCars from './pages/AdminCars';
import AdminBookings from './pages/AdminBookings';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <ProtectedRoute>
                <AdminCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-car"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
