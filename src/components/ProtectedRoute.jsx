import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate('/admin/login');
        }, 2000);
        return false;
      }
      return true;
    };

    if (!checkToken()) {
      return;
    }

    // Vérifier le token toutes les minutes
    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Toast
        message="Session expirée. Veuillez vous reconnecter."
        type="error"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      {children}
    </>
  );
};

export default ProtectedRoute;
