// import React, { useState } from "react";

// interface AdvancedFilterProps {
//   options: string[];
//   selectedOptions: string[];
//   onChange: (selected: string[]) => void;
//   placeholder?: string;
//   isRange?: boolean;
// }

// const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ 
//   options, 
//   selectedOptions, 
//   onChange, 
//   placeholder = "Select options...", 
//   isRange = false 
// }) => {
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [customMin, setCustomMin] = useState<string>("");
//   const [customMax, setCustomMax] = useState<string>("");

//   // Filter options based on search
//   const filteredOptions = options
//     .map(option => option ?? "")
//     .filter(option => option.toLowerCase().indexOf(search.toLowerCase()) !== -1);

//   // Toggle option selection
//   const handleToggle = (option: string) => {
//     const index = selectedOptions.indexOf(option);
//     if (index !== -1) {
//       onChange(selectedOptions.filter((item) => item !== option));
//     } else {
//       onChange([...selectedOptions, option]);
//     }
//   };

//   // Handle range selection
//   const handleRangeSubmit = () => {
//     if (customMin !== "" || customMax !== "") {
//       const range = `${customMin || "0"}-${customMax || "∞"}`;
//       onChange([range]);
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-full">
//       {/* Toggle Button with Arrow */}
//       <div
//         className="border p-2 cursor-pointer bg-white rounded flex justify-between items-center"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}</span>
//         <span>{isOpen ? "▲" : "▼"}</span> {/* Dropdown Indicator */}
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 bg-white border mt-1 w-full shadow-lg rounded p-2">
//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search..."
//             className="p-2 w-full border-b outline-none"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* Scrollable List */}
//           <div className="max-h-40 overflow-y-auto border-t">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <div
//                   key={option}
//                   className={`p-2 cursor-pointer ${
//                     selectedOptions.indexOf(option) !== -1 ? "bg-blue-200" : "hover:bg-gray-200"
//                   }`}
//                   onClick={() => handleToggle(option)}
//                 >
//                   {option}
//                 </div>
//               ))
//             ) : (
//               <div className="p-2 text-gray-500">No options found</div>
//             )}
//           </div>

//           {/* Range Selection (if enabled) */}
//           {isRange && (
//             <div className="mt-3">
//               <h4 className="text-sm font-semibold">Custom Range:</h4>
//               <div className="flex space-x-2">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   className="p-2 border w-1/2"
//                   value={customMin}
//                   onChange={(e) => setCustomMin(e.target.value)}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   className="p-2 border w-1/2"
//                   value={customMax}
//                   onChange={(e) => setCustomMax(e.target.value)}
//                 />
//               </div>
//               <button 
//                 className="mt-2 w-full bg-blue-500 text-white p-2 rounded" 
//                 onClick={handleRangeSubmit}
//               >
//                 Apply Range
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvancedFilter;
