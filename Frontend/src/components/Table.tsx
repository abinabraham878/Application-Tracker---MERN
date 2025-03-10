import { useState } from "react";
import { formatDate } from "../utils/dateFormater";
import { EllipsisVertical } from "lucide-react";

interface TableProps {
  columns: {
    title: string;
    key: string;
  }[];
  rowData: any[];
  maxHeight?: string;
  setIsActionClicked: (arg:boolean) => void;
}

const Table: React.FC<TableProps> = ({ columns, rowData, maxHeight = "400px", setIsActionClicked }) => {

  const [activeOptionMenu, setActiveOptionMenu] = useState<number | null>(null);

  const handleOptionClick = (rowIndex: number) => {
    if (activeOptionMenu === rowIndex) {
      setActiveOptionMenu(null);
    } else {
      setActiveOptionMenu(rowIndex);
    }
  };

  // Close popup when clicking outside
  const handleClickOutside = () => {
    setActiveOptionMenu(null);
  };

  return (
    <div className="mx-6 mt-6">
      {/* Column Headers - Fixed */}
      <div className="bg-gray-50 p-4 grid grid-cols-7 border-b border-gray-200">
        {columns.map((column, index) => (
          <div key={index} className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">
            {column.title}
          </div>
        ))}
        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center w-auto">
          ACTIONS
        </div>
      </div>
      
      {/* Table Body - Scrollable with max height */}
      <div 
        className="bg-white overflow-y-auto custom-scrollbar"
        style={{ 
          maxHeight: maxHeight,
        }}
        onClick={handleClickOutside}
      >
        {rowData.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`grid grid-cols-7 py-4 px-6 ${
              rowIndex !== rowData.length - 1 ? 'border-b border-gray-200' : ''
            } hover:bg-gray-50 transition-all`}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex items-center justify-center">
                {column.key === "status" ? (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(row[column.key])}`}>
                    {row[column.key]}
                  </span>
                ) : (
                  <span className="text-sm text-gray-700 justify-center">
                    {column.key === "createdAt" ? formatDate(row[column.key]) : row[column.key]}
                  </span>
                )}
              </div>
            ))}

            {/* Options Menu Icon */}
            <div className="flex justify-end items-center relative w-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(rowIndex);
                }}
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <EllipsisVertical size={16} className="text-gray-400" />
              </button>

              {/* Options Popup Menu */}
              {activeOptionMenu === rowIndex && (
                <div className="absolute right-0 top-8 z-10 bg-white rounded-lg shadow-lg py-2 w-48 border border-gray-200">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View details', row);
                      setActiveOptionMenu(null);
                      setIsActionClicked(true);
                    }}
                  >
                    Change Status
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine status tag color based on your card design
const getStatusColorClass = (status: string) => {
  switch (status) {
    case "Sent Application":
      return "bg-blue-100 text-blue-600";
    case "Shortlisted":
      return "bg-yellow-100 text-yellow-600";
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-600";
    case "Final Interview":
      return "bg-orange-100 text-orange-600";
    case "Offer Confirmed":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default Table;