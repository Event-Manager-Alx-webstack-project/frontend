import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/events";

// Function to get auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Default headers for requests
const defaultHeaders = {
  "Content-Type": "application/json",
};

// Get all events
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get a single event
export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// Get events by categories
export const getEventsByCategories = async (categories) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?categories=${categoryName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by categories:", error);
    throw error;
  }
}

// Get Events by User
export const getEventsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by user:", error);
    throw error;
  }
}


// Create an event
export const createEvent = async (eventData) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}`, eventData, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error.response?.data || error.message;
  }
};

// Upload thumbnail
export const uploadThumbnail = async (formData) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error.response?.data || error.message;
  }
};

// Update an event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}events/${id}`, eventData, {
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error.response?.data || error.message;
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${id}`, {
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error.response?.data || error.message;
  }
};

// Search events
export const searchEvents = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};

// Get events by category
/**export const getEventsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by category:", error);
    throw error;
  }
};*/

// Get events by location
export const getEventsByLocation = async (location) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/location/${location}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by location:", error);
    throw error;
  }
};

// Get events by date
export const getEventsByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by date:", error);
    throw error;
  }
};

// Get events by user
/**export const getEventsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by user:", error);
    throw error;
  }
};*/

// Get events by user attending
export const getEventsByUserAttending = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/attending/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by user attending:", error);
    throw error;
  }
};

// Get events by organizer (assuming organizer is identified by user ID)
export const getOrganizerEvents = async (organizerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/organizer/${organizerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizer's events:", error);
    throw error;
  }
};

// Promote an event
export const promoteEvent = async (eventId) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}events/${eventId}/promote`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error promoting event:", error);
    throw error.response?.data || error.message;
  }
};

// Get featured events
export const getFeaturedEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured events:", error);
    throw error;
  }
};

// Get upcoming events
export const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

// Like an event
export const likeEvent = async (eventId) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}${eventId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error liking event:", error);
    throw error.response?.data || error.message;
  }
};

// Dislike an event
export const dislikeEvent = async (eventId) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}${eventId}/dislike`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error disliking event:", error);
    throw error.response?.data || error.message;
  }
};

