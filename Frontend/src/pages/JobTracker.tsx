
import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import StatusBoard from '../components/StatusBoard';

const JobTracker = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    return (
      <>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Layout isCollapsed={isCollapsed}>
          <StatusBoard />
        </Layout>
      </>
    );
}

export default JobTracker;