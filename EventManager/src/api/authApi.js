import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/";

// Create an Axios instance for default configurations
let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store auth token in localStorage
export const storeAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Retrieve auth token from localStorage
export const getAuthToken = () => localStorage.getItem("authToken");

// Login function
export const loginUser = async (credentials) => {
  console.log(credentials);
  var config = {
    method: 'get',
    url: `${API_BASE_URL}login`,
    headers: { 'Authorization': 'Basic '+ credentials }
  };

  // axios(config)
  // .then(function (response) {
  //   console.log(response);
  //   // console.log(JSON.stringify(response));
  //   return response.data;
  // })
  // .catch(function (error) {
  //   // console.error("Error logging in:", error.response ? error.response.data : error.message);
  //   throw error;
  // });
  
  try {
    // axiosInstance.headers.Authorization = `Bearer ${credentials}`
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Register function
export const registerUser = async ({ username, email, password, confirmPassword, role, brandName, description }) => {
  try {
    const payload = { username, email, password, confirmPassword, role };
    
    if (role === "organizer") {
      payload.brandName = brandName;
      payload.description = description;
    }

    const response = await axiosInstance.post("users/register", payload);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch user profile
export const getUserProfile = async () => {
  const token = getAuthToken();
  try {
    const response = await axiosInstance.get("users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
    throw error;
  }
};