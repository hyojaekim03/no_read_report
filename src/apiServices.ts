import axios from "axios";

const API_BASE_URL = "/api"; // Proxy handles this to forward to backend

// Function to fetch admin report with pagination
export const fetchAdmReport = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/adm`, {
      params: { page, limit }, // Pass query parameters
    });
    console.log('response: ', response)
    return response.data;
  } catch (error) {
    console.error("Error fetching admin report:", error);
    throw error; // Re-throw error to handle it in the calling component
  }
};
