import React, { useState, useEffect } from "react";
import { fetchFilteredRefreshReport } from "../services/apiServices";
import "../styles/table.css";
import "../styles/pagination.css";

const DataTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 200;

  // filter states
  const [premiseFilter, setPremiseFilter] = useState<string>("All");
  const [utilityTypeFilter, setUtilityTypeFilter] = useState<string>("All");
  const [billCycleFilter, setBillCycleFilter] = useState<string>("All");

  const [meterCountFilter, setMeterCountFilter] = useState("All");
  const [amrFilter, setAmrFilter] = useState<string>("All");
  const [currCountFilter, setCurrCountFilter] = useState("All");
  const [tenToThirtyFilter, setTenToThirtyFilter] = useState("All");
  const [thirtyToSixtyFilter, setThirtyToSixtyFilter] = useState("All");
  const [sixtyToNintyFilter, setSixtyToNintyFilter] = useState("All");
  const [nintyPlusFilter, setNintyPlusFilter] = useState("All");

  const countFilterArray = ['<50', '50-100', '100-200', '200-300', '300-400', '400-500', '500+']

  // Fetch data from backend when filters or page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFilteredRefreshReport(currentPage, itemsPerPage, {
          premise: premiseFilter !== "All" ? premiseFilter : undefined,
          utilityType: utilityTypeFilter !== "All" ? utilityTypeFilter : undefined,
          billCycle: billCycleFilter !== "All" ? billCycleFilter : undefined,
          buildingMeterCount: meterCountFilter !== "All" ? meterCountFilter : undefined,
          amr: amrFilter !== "All" ? amrFilter : undefined,
          currentCout: currCountFilter !== "All" ? currCountFilter : undefined,
          tenToThirty: tenToThirtyFilter !== "All" ? tenToThirtyFilter : undefined,
          thirtyToSixty: thirtyToSixtyFilter !== "All" ? thirtyToSixtyFilter : undefined,
          sixtyToNinty: sixtyToNintyFilter !== "All" ? sixtyToNintyFilter : undefined,
          nintyPlus: nintyPlusFilter !== "All" ? nintyPlusFilter : undefined
        });

        console.log("Fetched Data:", response);
        const totalCount = response.totalCount[0][0].totalCount;
        setData(response.data);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, premiseFilter, utilityTypeFilter, billCycleFilter]); // 🔥 Triggers fetch when any of these change

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/*Premise Filter*/}
            <th>
              Premise
              <br />
              <select value={premiseFilter} onChange={(e) => setPremiseFilter(e.target.value)}>
                <option value="All">All</option>
                {/* Add dynamic options based on API data */}
                {Array.from(new Set(data.map((row) => row.premise))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*Utility Type Filter*/}
            <th>
              Utility Type
              <br />
              <select value={utilityTypeFilter} onChange={(e) => setUtilityTypeFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(data.map((row) => row.utilityType))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*Bill Cycle Filter*/}
            <th>
              Bill Cycle
              <br />
              <select value={billCycleFilter} onChange={(e) => setBillCycleFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(data.map((row) => row.billCycle))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*Building Meter Count Filter*/}
            <th>
              Building Meter Count
              <br />
              <select value={meterCountFilter} onChange={(e) => setMeterCountFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*AMR Filter*/}
            <th>
              AMR
              <br />
              <select value={amrFilter} onChange={(e) => setAmrFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(data.map((row) => row.amr))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*Current Count Filter*/}
            <th>
              Current Count
              <br />
              <select value={currCountFilter} onChange={(e) => setCurrCountFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*10-30 days Filter*/}
            <th>
              10-30 Days
              <br />
              <select value={tenToThirtyFilter} onChange={(e) => setTenToThirtyFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*30-60 days Filter*/}
            <th>
              30-60 Days
              <br />
              <select value={thirtyToSixtyFilter} onChange={(e) => setThirtyToSixtyFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*60-90 days Filter*/}
            <th>
              60-90 Days
              <br />
              <select value={sixtyToNintyFilter} onChange={(e) => setSixtyToNintyFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*90+ days Filter*/}
            <th>
              90+ Days
              <br />
              <select value={nintyPlusFilter} onChange={(e) => setNintyPlusFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(countFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.premise !== null ? row.premise : "N/A"}</td>
              <td>{row.utilityType !== null ? row.utilityType : "N/A"}</td>
              <td>{row.billCycle !== null ? row.billCycle : "N/A"}</td>
              <td>{row.buildingMeterCount !== null ? row.buildingMeterCount : "N/A"}</td>
              <td>{row.amr !== null ? row.amr : "N/A"}</td>
              <td>{row.current !== null ? row.current : "N/A"}</td>
              <td>{row.tenToThirtyCount !== null ? row.tenToThirtyCount : "N/A"}</td>
              <td>{row.thirtyToSixtyCount !== null ? row.thirtyToSixtyCount : "N/A"}</td>
              <td>{row.sixtyToNintyCount !== null ? row.sixtyToNintyCount : "N/A"}</td>
              <td>{row.nintyPlusCount !== null ? row.nintyPlusCount : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
