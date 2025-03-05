import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  isExpanded: boolean;
  handleOpenModal: () => void;
}

const Layout = ({ children, isExpanded, handleOpenModal }: LayoutProps) => {
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`transition-all duration-300 ${!isExpanded ? 'ml-16' : 'ml-64'}`}></div>
      <main className={`flex-1 transition-all duration-300`}>
      <Header handleOpenModal={handleOpenModal}/>
        {children}
      </main>
    </div>
  );
}

export default Layout;