import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/";

// Function to get the authentication token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Function to set default headers
const getDefaultHeaders = () => ({
  Authorization: `Bearer ${JSON.parse(getAuthToken())}`,
});

// Get categories function
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}categories`, {
      headers: getDefaultHeaders(),
    });
    console.log(response.categories);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Get organizers function
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}users/all`, {
      headers: getDefaultHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizers:", error);
    throw error;
  }
};