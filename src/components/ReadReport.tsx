import React, { useState, useEffect } from "react";
import { fetchFilteredRefreshReport } from "../services/apiServices";
import { FilterParams } from "../types/filters";
import { round } from "../utils/math";
import "../styles/table.css";
import "../styles/pagination.css";

const ReadReport: React.FC = () => {
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
  const [fourToTenFilter, setFourToTenFilter] = useState("All");
  const [tenToThirtyFilter, setTenToThirtyFilter] = useState("All");
  const [thirtyToSixtyFilter, setThirtyToSixtyFilter] = useState("All");
  const [sixtyToNintyFilter, setSixtyToNintyFilter] = useState("All");
  const [nintyPlusFilter, setNintyPlusFilter] = useState("All");

  const countFilterArray = ['<50', '50-100', '100-200', '200-300', '300-400', '400-500', '500+']
  const percentFilterArray = ['<25%', '25-50%', '50-75%', '75-99%', '100%']

  // Fetch data from backend when filters or page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filters: FilterParams = {
          property: premiseFilter !== "All" ? premiseFilter : undefined,
          utility: utilityTypeFilter !== "All" ? utilityTypeFilter : undefined,
          billCycle: billCycleFilter !== "All" ? billCycleFilter : undefined,
          buildingMeterCount: meterCountFilter !== "All" ? meterCountFilter : undefined,
          amr: amrFilter !== "All" ? amrFilter : undefined,
          currentCount: currCountFilter !== "All" ? currCountFilter : undefined,
          days4to10: fourToTenFilter !== "All" ? fourToTenFilter : undefined,
          days10to30: tenToThirtyFilter !== "All" ? tenToThirtyFilter : undefined,
          days30to60: thirtyToSixtyFilter !== "All" ? thirtyToSixtyFilter : undefined,
          days60to90: sixtyToNintyFilter !== "All" ? sixtyToNintyFilter : undefined,
          days90Plus: nintyPlusFilter !== "All" ? nintyPlusFilter : undefined
        };

        const response = await fetchFilteredRefreshReport(currentPage, itemsPerPage, filters);
        console.log("Fetched Data:", response);
        console.log()

        setData(response.data);
        setTotalPages(Math.ceil(response.totalCount[0][0].totalCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, premiseFilter, utilityTypeFilter, billCycleFilter, meterCountFilter, amrFilter, currCountFilter, fourToTenFilter, tenToThirtyFilter, thirtyToSixtyFilter, sixtyToNintyFilter, nintyPlusFilter]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <th>Building Count</th>
          <th>Non-Comm Count (30+)</th>
          <th>Non-Comm %</th>
          <th>30-60 Days Non-Comm</th>
          <th>60-90 Days Non-Comm</th>
          <th>90+ Days Non-Comm</th>
        </thead>
        <tbody>

        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            {/*Premise Filter*/}
            <th>
              Address
              <br />
              <select value={premiseFilter} onChange={(e) => setPremiseFilter(e.target.value)}>
                <option value="All">All</option>
                {/* Add dynamic options based on API data */}
                {Array.from(new Set(data.map((row) => row.property))).map((option) => (
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
                {Array.from(new Set(data.map((row) => row.utility))).map((option) => (
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

            {/*Bill Cycle Filter*/}
            <th>
              Bill Cycle
              <br />
              <select value={billCycleFilter} onChange={(e) => setBillCycleFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(data.map((row) => row.bill_cycle))).map((option) => (
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

            {/*4-10 days Filter*/}
            <th>
              Non-Comm %
              <br />
              <select value={fourToTenFilter} onChange={(e) => setFourToTenFilter(e.target.value)}>
                <option value="All">All</option>
                {Array.from(new Set(percentFilterArray.map((row) => row))).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </th>

            {/*MaxLastRead Filter*/}
            <th>
              MaxLastRead
            </th>
            
              {/*4-10 days Filter*/}
              <th>
              4-10 Days
              <br />
              <select value={fourToTenFilter} onChange={(e) => setFourToTenFilter(e.target.value)}>
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
        {data.map((row, index) => {
          // Calculate Non-Comm %
            const nonCommPercentage = Math.round(((row.days_30_to_60 + row.days_60_to_90 + row.days_90_plus) * 100) / row.building_meter_count)

                  // Assign CSS class based on Non-Comm %
                  const rowClass =
                    nonCommPercentage >= 100
                      ? "non-comm-full"
                      : nonCommPercentage >= 75
                      ? "non-comm-high"
                      : nonCommPercentage >= 50
                      ? "non-comm-medium"
                      : "non-comm-low";

                  return (
                    <tr key={index} className={rowClass}>
                      <td>{row.property ?? "N/A"}</td>
                      <td>{row.utility ?? "N/A"}</td>
                      <td>{row.amr ?? "N/A"}</td>
                      <td>{row.bill_cycle ?? "N/A"}</td>
                      <td>{row.building_meter_count ?? "N/A"}</td>
                      <td>{row.current ?? "N/A"}</td>
                      {/* <td>{`${nonCommPercentage}%`}</td> */}
                      <td>{`${row.non_comm_percentage}`}</td>
                      <td>{row.max_last_read}</td>
                      <td>{row.days_4_to_10 ?? "N/A"}</td>
                      <td>{row.days_10_to_30 ?? "N/A"}</td>
                      <td>{row.days_30_to_60 ?? "N/A"}</td>
                      <td>{row.days_60_to_90 ?? "N/A"}</td>
                      <td>{row.days_90_plus ?? "N/A"}</td>
                    </tr>
                  );
                })}
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

export default ReadReport;
