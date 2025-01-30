import axios from "axios";
import { FilterParams } from "../types/filters";

const API_BASE_URL = "/api"; // Proxy handles this to forward to backend

export const fetchFilteredRefreshReport = async (
  page: number,
  limit: number,
  filters: FilterParams
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filteredReport`, {
      params: {
        page,
        limit,
        ...filters, // Automatically handles query params
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching filtered report:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const fetchNonCommCount = async (groupBy?: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nonCommCount`, {
      params: {
        groupBy
      }
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching non_commReport:", error);
    throw error;
  }
}

// Function to fetch admin report with pagination
// export const fetchAdmReport = async (page: number, limit: number) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/report`, {
//       params: { page, limit }, // Pass query parameters
//     });
//     console.log('response: ', response)
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching admin report:", error);
//     throw error; // Re-throw error to handle it in the calling component
//   }
// };

//might be able to combine these two ()
// export const fetchFilteredRefreshReport = async (page: number, limit: number, filters: FilterParams) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/filteredReport`, {
//       params: {page, limit},
//     });
//     console.log('response: ', response)
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching filtered admin report:", error);
//     throw error;
//   }
// }
