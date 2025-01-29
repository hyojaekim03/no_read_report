import React, { useState } from "react";
import ReadReport from "./components/ReadReport"; // Import the DataTable component
import "./styles/App.css"; // Import styles

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(()=>{
    const savedState = localStorage.getItem('activeTab');
    return savedState ? JSON.parse(savedState) : 'Total View'
  });

  const setTab = (tab:string):void => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', JSON.stringify(tab))
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Total View":
        return <div className="tab-content">Total View Content</div>;
      case "Read Report":
        return <ReadReport />; 
      case "Exception Report":
        return <div className="tab-content">Exception Report Content</div>;
      case "Alerts":
        return <div className="tab-content">Alerts Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">MDM Reporting System</h1>
      
      {/* tab navigation */}
      <div className="tabs">
        {["Total View", "Read Report", "Exception Report", "Alerts"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* tab content */}
      <div className="tab-content-wrapper">{renderContent()}</div>
    </div>
  );
};

export default App;



// import React from "react";
// import DataTable from "./components/DataTable"; // Import the new DataTable component
// import "./styles/App.css"; // Import styles

// const App: React.FC = () => {
//   return (
//     <div className="container">
//       <h1 className="app-title">MDM Read Report</h1>
//       <DataTable /> {/* Render DataTable without passing data explicitly */}
//     </div>
//   );
// };

// export default App;

