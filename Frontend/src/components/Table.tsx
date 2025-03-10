import { useState, useRef, useEffect } from "react";
import { formatDate } from "../utils/dateFormater";
import { EllipsisVertical, Filter, X, Check } from "lucide-react";

interface TableProps {
  columns: {
    title: string;
    key: string;
    filter: boolean;
  }[];
  rowData: any[];
  maxHeight?: string;
  setIsActionClicked: (arg:boolean) => void;
  setRowDataId: (arg: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, rowData, maxHeight = "400px", setIsActionClicked, setRowDataId }) => {

  const [activeOptionMenu, setActiveOptionMenu] = useState<number | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<{[key: string]: string[]}>({});
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});
  
  const filterPopoverRef = useRef<HTMLDivElement>(null);

  // Initialize filter values from row data
  useEffect(() => {
    const newFilterValues: {[key: string]: string[]} = {};
    
    columns.forEach(column => {
      if (column.filter) {
        // Get unique values for this column
        const uniqueValues = Array.from(new Set(rowData.map(row => row[column.key])));
        newFilterValues[column.key] = uniqueValues as string[];
      }
    });
    
    setFilterValues(newFilterValues);
    
    // Initialize selected filters with empty arrays
    const initialSelectedFilters: {[key: string]: string[]} = {};
    columns.forEach(column => {
      if (column.filter) {
        initialSelectedFilters[column.key] = [];
      }
    });
    setSelectedFilters(initialSelectedFilters);
  }, [columns, rowData]);

  const handleOptionClick = (rowIndex: number) => {
    if (activeOptionMenu === rowIndex) {
      setActiveOptionMenu(null);
    } else {
      setActiveOptionMenu(rowIndex);
    }
    setActiveFilterColumn(null); // Close any open filter when opening option menu
  };

  const handleFilterClick = (e: React.MouseEvent, columnKey: string) => {
    e.stopPropagation();
    if (activeFilterColumn === columnKey) {
      setActiveFilterColumn(null);
    } else {
      setActiveFilterColumn(columnKey);
      setActiveOptionMenu(null); // Close any open option menu when opening filter
    }
  };

  // Close popups when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (filterPopoverRef.current && !filterPopoverRef.current.contains(e.target as Node)) {
      setActiveFilterColumn(null);
    }
    setActiveOptionMenu(null);
  };

  // Toggle a filter value selection
  const toggleFilterValue = (columnKey: string, value: string) => {
    setSelectedFilters(prev => {
      const current = [...prev[columnKey]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [columnKey]: current
      };
    });
  };

  // Reset filters for a column
  const resetFilters = (columnKey: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [columnKey]: []
    }));
  };

  // Apply filters to row data
  const filteredData = rowData.filter(row => {
    for (const [key, values] of Object.entries(selectedFilters)) {
      if (values.length > 0 && !values.includes(row[key])) {
        return false;
      }
    }
    return true;
  });

  // Calculate grid columns based on the number of columns + 1 for actions
  const gridCols = `grid-cols-${columns.length + 1}`;

  // Get active column title
  const getActiveColumnTitle = () => {
    if (!activeFilterColumn) return "";
    const column = columns.find(col => col.key === activeFilterColumn);
    return column ? column.title : "";
  };

  return (
    <div className="mx-6 mt-6 mb-6">
      {/* Column Headers - Fixed */}
      <div className={`bg-gray-50 p-4 grid ${gridCols} border-b border-gray-200`}>
        {columns.map((column, index) => (
          <div key={index} className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center flex items-center justify-center relative">
            {column.title}
            {column.filter && (
              <button 
                onClick={(e) => handleFilterClick(e, column.key)}
                className={`ml-1 p-1 rounded hover:bg-gray-200 focus:outline-none flex items-center justify-center ${
                  selectedFilters[column.key]?.length > 0 ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                <Filter size={16} />
              </button>
            )}
            
            {/* Filter Popover */}
            {activeFilterColumn === column.key && (
              <div 
                ref={filterPopoverRef}
                className="absolute top-10 left-0 z-20 bg-white rounded-lg shadow-lg w-72 border border-gray-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <span className="font-medium text-sm text-gray-700">FILTER: {getActiveColumnTitle()}</span>
                  <button 
                    onClick={() => setActiveFilterColumn(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="max-h-64 overflow-y-auto py-2 px-2">
                  {filterValues[column.key]?.map((value, i) => (
                    <div 
                      key={i} 
                      className="flex items-center mb-2 hover:bg-gray-50 rounded p-1"
                    >
                      <label className="flex items-center cursor-pointer w-full">
                        <input 
                          type="checkbox"
                          checked={selectedFilters[column.key]?.includes(value)}
                          onChange={() => toggleFilterValue(column.key, value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 mr-3 flex items-center justify-center border rounded ${
                          selectedFilters[column.key]?.includes(value) 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedFilters[column.key]?.includes(value) && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                        <span className="text-sm text-gray-700 uppercase">
                          {value}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 px-4 py-3 flex justify-between bg-gray-50">
                  <button 
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                    onClick={() => resetFilters(column.key)}
                  >
                    Reset
                  </button>
                  <button 
                    className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                    onClick={() => setActiveFilterColumn(null)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center">
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
        {rowData.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-2">
              <span className="block text-4xl mb-2">📋</span>
              <h3 className="text-lg font-medium text-gray-600">No jobs added yet</h3>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Start by adding your first job application to begin tracking your job search progress.
            </p>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`grid ${gridCols} py-4 px-6 ${
                rowIndex !== filteredData.length - 1 ? 'border-b border-gray-200' : ''
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
              <div className="flex justify-center items-center relative">
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
                        setRowDataId(row._id)
                      }}
                    >
                      Change Status
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p className="text-sm">No results found. Try adjusting your filters.</p>
            <button 
              className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-700"
              onClick={() => {
                // Reset all filters
                const resetAllFilters = {};
                Object.keys(selectedFilters).forEach(key => {
                  resetAllFilters[key] = [];
                });
                setSelectedFilters(resetAllFilters);
              }}
            >
              Reset all filters
            </button>
          </div>
        )}
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
    case "Technical Interview":
      return "bg-purple-100 text-purple-600";
    case "Final Interview":
      return "bg-orange-100 text-orange-600";
    case "Offer Confirmed":
      return "bg-green-100 text-green-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default Table;