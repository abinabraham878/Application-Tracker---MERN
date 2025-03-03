import { BarChart2, Briefcase, ChevronLeft, ChevronRight, ClipboardList, FileText, Users } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar= ({ isExpanded, toggleSidebar }: SidebarProps) => {
  return (
    <div className={`h-full fixed top-0 left-0 bg-blue-900 p-4 flex flex-col justify-between transition-all duration-300 ${isExpanded ? 'w-64': 'w-20'}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2 pb-6 border-b border-blue-700">
          <Briefcase size={24} className="text-white" />
          {isExpanded && <h1 className="text-xl font-bold text-white">JobTrackr</h1>}
        </div>
        <div className="flex flex-col space-y-2">
          <SidebarItem icon={<ClipboardList size={20} />} text="Applications" isActive={true} isExpanded={isExpanded} />
          <SidebarItem icon={<BarChart2 size={20} />} text="Analytics" isActive={false} isExpanded={isExpanded} />
          <SidebarItem icon={<FileText size={20} />} text="Resumes" isActive={false} isExpanded={isExpanded} />
          <SidebarItem icon={<Users size={20} />} text="Contacts" isActive={false} isExpanded={isExpanded} />
        </div>
      </div>
      
      <button 
        onClick={toggleSidebar} 
        className="self-end mt-auto bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-full"
      >
        {!isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;