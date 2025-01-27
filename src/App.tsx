import React, { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { fetchAdmReport } from "./apiServices"; // Import the function
import "./css/App.css";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 200;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchAdmReport(currentPage, itemsPerPage); 
        console.log("jsonData: ", jsonData);
        const totalCount = jsonData.totalCount[0][0].totalCount;

        setData(jsonData.data); // set the data for the current page
        setTotalPages(Math.ceil(totalCount / itemsPerPage)); // calculate total pages
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Refetch data when the current page changes

  if (loading) return <p>Loading...</p>;

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <h1 className="app-title">MDM Read Report</h1>
      <DataTable
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
