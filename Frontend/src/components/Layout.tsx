import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  isCollapsed: boolean;
}

const Layout = ({ children, isCollapsed }: LayoutProps) => {
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}></div>
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Application Board</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Application
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

export default Layout;