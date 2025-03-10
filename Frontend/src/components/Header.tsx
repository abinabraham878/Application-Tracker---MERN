import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CircleUserRound, LogOut, PlusSquare } from 'lucide-react';

const Header = ({ handleOpenModal }: { handleOpenModal: () => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { getUserInitials, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    // Add event listener when dropdown is open
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="flex justify-between items-center w-full py-4 px-6">
      <h1 className="text-xl font-bold">Application Board</h1>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center cursor-pointer hover:bg-blue-600" onClick={handleOpenModal}>
          <PlusSquare size={16} className="mr-2" />
          <span>Add New Application</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400"
          >
            <span className="text-sm font-bold">{getUserInitials()}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {/* <a
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
              >
                <CircleUserRound size={16} className="text-blue-600" />
                <span>My Profile</span>
              </a> */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
              >
                <LogOut size={16} className="text-blue-600" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;