import React from "react";
import DataTable from "./components/DataTable"; // Import the new DataTable component
import "./css/App.css"; // Import styles

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="app-title">MDM Read Report</h1>
      <DataTable /> {/* Render DataTable without passing data explicitly */}
    </div>
  );
};

export default App;

