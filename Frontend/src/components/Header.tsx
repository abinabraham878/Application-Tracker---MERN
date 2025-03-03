const Header = ({ isExpanded }: {isExpanded: boolean}) => {
  console.log(isExpanded);
  return (
    <div className={`flex justify-between items-center p-4 bg-white shadow-sm transition-all duration-300 ease-in-out ${isExpanded ? 'ml-0' : 'ml-5'} sticky top-0 z-5 right-0 left-0`}>
      <h2 className="text-xl font-medium text-gray-800">Application Board</h2>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        Add New Application
      </button>
    </div>
  );
};

export default Header;
