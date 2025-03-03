interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, text, isActive, isCollapsed }: SidebarItemProps) => {
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`}>
        {icon}
        {!isCollapsed && <span className="font-medium">{text}</span>}
      </div>
    );
  };

  export default SidebarItem;