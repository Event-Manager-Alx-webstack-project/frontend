import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/";

// Function to get auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Default headers for requests
const defaultHeaders = {
  "Content-Type": "application/json",
};

// Get all events or events by a specific organizer
export const getEvents = async (organizerId = null) => {
  const token = getAuthToken();
  try {
    const url = organizerId 
      ? `${API_BASE_URL}events?organizerId=${organizerId}` 
      : `${API_BASE_URL}events`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get a single event
//export const getEvent = async (id) => {
  //try {
    //const response = await axios.get(`${API_BASE_URL}events/${id}`);
   // return response.data;
  //} catch (error) {
    //console.error("Error fetching event:", error);
    //throw error;
  //}
//};

// Get events by categories
export const getEventsByCategories = async (categoryName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events?categories=${categoryName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by categories:", error);
    throw error;
  }
};

// Get Events by User
export const getEventsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by user:", error);
    throw error;
  }
};

// Create an event
export const createEvent = async (eventData) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}events`, eventData, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${JSON.parse(token)}`,
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
    const response = await axios.delete(`${API_BASE_URL}events/${id}`, {
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
    const response = await axios.get(`${API_BASE_URL}events${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};

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
export const handleRegister = async (eventId) => {
  try {
      const response = await axios.post(`/api/events/${eventId}/register`);
      console.log('Successfully registered for the event', response.data);
      // Show success message or update the UI accordingly
  } catch (error) {
      console.error('Error registering for the event:', error);
      // Show error message or handle error accordingly
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
//export const getFeaturedEvents = async () => {
//  try {
//    const response = await axios.get(`${API_BASE_URL}events/featured`);
//    return response.data;
//  } catch (error) {
 //   console.error("Error fetching featured events:", error);
 //   throw error;
 // }
//};

// Get upcoming events
//export const getUpcomingEvents = async () => {
  //try {
    //const response = await axios.get(`${API_BASE_URL}events/upcoming`);
 //   return response.data;
 // } catch (error) {
   // console.error('Error fetching upcoming events:', error);
   // throw error;
//  }
//};
//
export const handleLike = async (eventId) => {
  try {
    const response = await likeEvent(eventId);
    console.log('Event liked:', response);
    // Update the UI or state accordingly (e.g., increment like count)
  } catch (error) {
    console.error('Error liking event:', error);
    // Handle the error (e.g., show error message)
  }
};

export const handleFollow = async (organizerId) => {
  try {
    // Assuming you have a follow API for organizers (not included in the provided code)
    const response = await axios.post(`${API_BASE_URL}organizers/${organizerId}/follow`, {}, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    console.log('Followed organizer:', response);
    // Update the UI or state accordingly
  } catch (error) {
    console.error('Error following organizer:', error);
    // Handle the error
  }
};

export const handleComment = async (eventId, comment) => {
  try {
    const response = await axios.post(`${API_BASE_URL}events/${eventId}/comment`, { comment }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    console.log('Comment added:', response);
    // Update the UI to reflect the new comment
  } catch (error) {
    console.error('Error adding comment:', error);
    // Handle the error
  }
};

export const handleShare = async (eventId) => {
  try {
    // Logic for sharing the event (e.g., copy link or share on social media)
    const shareLink = `${window.location.origin}/events/${eventId}`;
    console.log(`Event link copied to clipboard: ${shareLink}`);
    // You could also integrate a sharing API if available
  } catch (error) {
    console.error('Error sharing event:', error);
  }
};

//export const handleRegister = async (eventId) => {
  //try {
    //const response = await axios.post(`${API_BASE_URL}events/${eventId}/register`, {}, {
      //headers: {
        //Authorization: `Bearer ${getAuthToken()}`,
     // },
    //});
    //console.log('Successfully registered for the event', response.data);
    // Update the UI or state accordingly
  //} catch (error) {
   // console.error('Error registering for the event:', error);
    // Handle the error
 // }
//};

// Like an event
export const likeEvent = async (eventId) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${API_BASE_URL}events/${eventId}/like`, {}, {
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
    const response = await axios.post(`${API_BASE_URL}events/${eventId}/dislike`, {}, {
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
