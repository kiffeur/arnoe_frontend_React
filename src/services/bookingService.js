const API_URL = 'https://monkfish-app-k34hb.ondigitalocean.app/api';

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const responseData = await response.json();

    if (response.status === 400) {
      // Cas spécifique pour la non-disponibilité de la voiture
      throw new Error(responseData.message || 'La voiture n\'est pas disponible pour les dates sélectionnées');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Une erreur est survenue lors de la réservation');
    }

    return responseData;
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des réservations');
    }

    return responseData;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Erreur lors de la mise à jour du statut');
    }

    return responseData;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ bookingId: Number(bookingId) }),
    });

    const responseData = await response.json();

    if (response.status === 400) {
      throw new Error(responseData.message || 'Erreur de requête : Vérifiez les informations saisies');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Une erreur est survenue lors de l\'annulation de la réservation');
    }

    return responseData;
  } catch (error) {
    console.error('Booking cancellation error:', error);
    throw error;
  }
};

export const validateBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ bookingId: Number(bookingId) }),
    });

    const responseData = await response.json();

    if (response.status === 400) {
      throw new Error(responseData.message || 'Erreur de requête : Vérifiez les informations saisies');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Une erreur est survenue lors de la validation de la réservation');
    }

    return responseData;
  } catch (error) {
    console.error('Booking validation error:', error);
    throw error;
  }
};
