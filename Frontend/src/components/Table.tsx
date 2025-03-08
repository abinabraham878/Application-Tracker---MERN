import { EllipsisVertical } from "lucide-react";
import { formatDate } from "../utils/dateFormater";

interface TableProps {
  columns: {
    title: string;
    key: string;
  }[];
  rowData: any[];
  maxHeight?: string;
}

const Table: React.FC<TableProps> = ({ columns, rowData, maxHeight = "400px" }) => {
  return (
    <div className="mx-6 mt-6">
      {/* Column Headers - Fixed */}
      <div className="bg-gray-50 p-4 grid grid-cols-6 gap-4 rounded-t-lg border-b border-gray-200">
        {columns.map((column, index) => (
          <div key={index} className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            {column.title}
          </div>
        ))}
        <div key="option" className="text-gray-500 text-xs font-medium uppercase tracking-wider"></div>
      </div>
      
      {/* Table Body - Scrollable with max height */}
      <div 
        className={`bg-white rounded-b-lg shadow-sm overflow-y-auto max-h-[${maxHeight}]`}
    
      >
        {rowData.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`grid grid-cols-6 gap-4 p-4 ${
              rowIndex !== rowData.length - 1 ? 'border-b border-gray-100' : ''
            } hover:bg-gray-50 transition-all duration-300 ease-in-out`}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex items-center">
                {column.key === "status" ? (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(row[column.key])}`}>
                    {row[column.key]}
                  </span>
                ) : (
                  <span className="text-sm text-gray-700">
                    {column.key === "createdAt" ? formatDate(row[column.key]) : row[column.key]}
                  </span>
                )}
              </div>
            ))}
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