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
  setIsActionClicked: (arg: boolean) => void;
  setRowDataId: (arg: string) => void;
  fetchData: (filters?: FilterPayload[]) => Promise<any>;
  loading: boolean;
}

interface FilterPayload {
  columnName: string;
  value: string[];
  operation: string;
}

const Table: React.FC<TableProps> = ({ 
  columns, 
  rowData = [], // Default to empty array to prevent null errors
  maxHeight = "400px", 
  setIsActionClicked, 
  setRowDataId, 
  fetchData,
  loading
}) => {
  const [activeOptionMenu, setActiveOptionMenu] = useState<number | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<{[key: string]: string[]}>({});
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});
  const [appliedFilters, setAppliedFilters] = useState<{[key: string]: string[]}>({});
  
  const filterPopoverRef = useRef<HTMLDivElement>(null);

  // Initialize filter values from row data
  useEffect(() => {
    // Store original filter values to use when resetting
    const newFilterValues: {[key: string]: string[]} = {};
    
    columns.forEach(column => {
      if (column.filter) {
        // Get unique values for this column, handling nulls and undefined
        const uniqueValues = Array.from(new Set(
          rowData
            .filter(row => row && row[column.key] !== undefined && row[column.key] !== null)
            .map(row => row[column.key].toString())
        ));
        newFilterValues[column.key] = uniqueValues as string[];
      }
    });
    
    setFilterValues(newFilterValues);
    
    // Only initialize selected filters if they haven't been set yet
    if (Object.keys(selectedFilters).length === 0) {
      const initialSelectedFilters: {[key: string]: string[]} = {};
      columns.forEach(column => {
        if (column.filter) {
          initialSelectedFilters[column.key] = [];
        }
      });
      setSelectedFilters(initialSelectedFilters);
      setAppliedFilters(initialSelectedFilters);
    }
  }, [columns, rowData]);

  const handleOptionClick = (rowIndex: number) => {
    if (activeOptionMenu === rowIndex) {
      setActiveOptionMenu(null);
    } else {
      setActiveOptionMenu(rowIndex);
    }
    setActiveFilterColumn(null);
  };

  const handleFilterClick = (e: React.MouseEvent, columnKey: string) => {
    e.stopPropagation();
    if (activeFilterColumn === columnKey) {
      setActiveFilterColumn(null);
    } else {
      setActiveFilterColumn(columnKey);
      setActiveOptionMenu(null);
      
      // When opening a filter, make the selectedFilters match the appliedFilters
      setSelectedFilters(prev => ({
        ...prev,
        [columnKey]: [...(appliedFilters[columnKey] || [])]
      }));
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (filterPopoverRef.current && !filterPopoverRef.current.contains(e.target as Node)) {
      setActiveFilterColumn(null);
    }
    setActiveOptionMenu(null);
  };

  const toggleFilterValue = (columnKey: string, value: string) => {
    setSelectedFilters(prev => {
      const current = [...(prev[columnKey] || [])]; // Add fallback for empty arrays
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

  const resetFilters = (columnKey: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [columnKey]: []
    }));
  };

  const resetAllFilters = async () => {
    const resetFilters: {[key: string]: string[]} = {};
    Object.keys(selectedFilters).forEach(key => {
      resetFilters[key] = [];
    });
    
    setSelectedFilters(resetFilters);
    setAppliedFilters(resetFilters);
    
    try {
      await fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = async () => {
    const filterPayload: FilterPayload[] = [];
    
    // Update appliedFilters to match selectedFilters
    setAppliedFilters({...selectedFilters});
    
    for (const [key, values] of Object.entries(selectedFilters)) {
      if (values && values.length > 0) {
        filterPayload.push({
          columnName: key,
          value: values,
          operation: "in"
        });
      }
    }
    
    try {
      await fetchData(filterPayload.length > 0 ? filterPayload : undefined);
      setActiveFilterColumn(null);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const gridCols = `grid-cols-${columns.length + 1}`;

  const getActiveColumnTitle = () => {
    if (!activeFilterColumn) return "";
    const column = columns.find(col => col.key === activeFilterColumn);
    return column ? column.title : "";
  };

  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some(values => values && values.length > 0);
  };

  // Function to check if a column has active filters
  const hasColumnActiveFilters = (columnKey: string) => {
    return appliedFilters[columnKey] && appliedFilters[columnKey].length > 0;
  };

  return (
    <div className="mx-6 mt-6 mb-6 rounded-lg shadow-md">
      {/* Column Headers - Fixed */}
      <div className={`bg-gray-50 p-4 grid ${gridCols} border-b border-gray-200`}>
        {columns.map((column, index) => (
          <div key={index} className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center flex items-center justify-center relative">
            {column.title}
            {column.filter && (
              <button 
                onClick={(e) => handleFilterClick(e, column.key)}
                className={`ml-1 p-1 rounded hover:bg-gray-200 focus:outline-none flex items-center justify-center ${
                  hasColumnActiveFilters(column.key) ? 'text-blue-500' : 'text-gray-400'
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
                    onClick={applyFilters}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider text-center flex items-center justify-center relative">
          ACTIONS
        </div>
      </div>
      
      {/* Filter indicator and reset button */}
      {hasActiveFilters() && (
        <div className="bg-blue-50 px-4 py-2 flex justify-between items-center border-b border-blue-100">
          <span className="text-sm text-blue-700">
            Showing filtered results
          </span>
          <button
            onClick={resetAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset all filters
          </button>
        </div>
      )}
      
      {/* Table Body - Scrollable with max height */}
      <div 
        className="bg-white overflow-y-auto custom-scrollbar"
        style={{ 
          maxHeight: maxHeight,
        }}
        onClick={handleClickOutside}
      >
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : rowData?.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-2">
              <span className="block text-4xl mb-2">📋</span>
              <h3 className="text-lg font-medium text-gray-600">
                {hasActiveFilters() ? "No matching results" : "No jobs added yet"}
              </h3>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              {hasActiveFilters() 
                ? "Try adjusting your filters or reset them to see all jobs."
                : "Start by adding your first job application to begin tracking your job search progress."}
            </p>
            {hasActiveFilters() && (
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={resetAllFilters}
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          rowData.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`grid ${gridCols} py-4 px-6 ${
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
                        setActiveOptionMenu(null);
                        setIsActionClicked(true);
                        setRowDataId(row._id);
                      }}
                    >
                      Change Status
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Helper function to determine status tag color
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