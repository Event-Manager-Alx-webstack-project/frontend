import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL =  "http://localhost:5000/";

// Store auth token in localStorage
export const storeAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}auth/users/login`,
      { email, password }, // Payload
      {
        withCredentials: true, // Include credentials (cookies, etc.)
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Register function
export const registerUser = async ({
  username,
  email,
  password,
  confirmPassword,
  role,
  brandName,
  description,
}) => {
  try {
    const payload = {
      username,
      email,
      password,
      confirmPassword,
      role,
    };

    // Conditionally add organizer-specific fields
    if (role === "organizer") {
      payload.brandName = brandName;
      payload.description = description;
    }

    console.log("Payload:", payload); // Log the payload for debugging

    const response = await axios.post(
      `${API_BASE_URL}auth/users/register`,
      payload,
      {
        withCredentials: true, // Include credentials
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}users/profile`, {
      withCredentials: true, // Include credentials
      headers: {
        Authorization: `Bearer ${token}`, // Authorization with Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
    throw error;
  }
};