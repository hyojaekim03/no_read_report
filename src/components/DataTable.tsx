import React from "react";
import "../css/table.css";
import "../css/pagination.css";

const DataTable: React.FC<{
  data: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ data, currentPage, totalPages, onPageChange }) => {
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const keys = Object.keys(data[0]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{row[key] !== null ? row[key] : "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
