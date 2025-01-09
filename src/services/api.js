const API_BASE_URL = 'https://monkfish-app-k34hb.ondigitalocean.app';

const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token expiré ou invalide
    localStorage.removeItem('token');
    throw new Error('Session expirée');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }

  return await response.json();
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const addCar = async (carData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Session expirée');
    }

    const response = await fetch(`${API_BASE_URL}/api/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(carData),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Cars API
export const getAllCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars`);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars/${id}`);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getAvailableCars = async () => {
  try {
    const cars = await getAllCars();
    return cars.filter(car => car.isAvailable);
  } catch (error) {
    throw error;
  }
};

export const getFilteredCars = async ({ currentLocation, destination, carType }) => {
  try {
    const cars = await getAllCars();
    return cars.filter(car => {
      // Filtre pour les voitures non-4x4 (destinations limitées)
      if (!car.is4x4 && destination && !['Douala', 'Kribi', 'Edea'].includes(destination)) {
        return false;
      }
      
      // Filtre par type de voiture
      if (carType && car.carType !== carType) {
        return false;
      }

      return true;
    });
  } catch (error) {
    throw error;
  }
};
