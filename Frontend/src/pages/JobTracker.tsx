
import { useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import StatusBoard from '../components/StatusBoard';
import { CheckCircle, FileText, Users } from 'lucide-react';
import Modal from '../components/Modal';
import JobApplicationForm from './JobApplicationForm';

const JobTracker = () => {
    const [isExpanded, setisExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const childRef = useRef<any>(null);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const toggleSidebar = () => {
      setisExpanded(!isExpanded);
    };

    const statusData: any = [
      {
        id: 1,
        title: "Sent Applications",
        count: "10",
        icon: <FileText size={20} className="text-blue-500" />,
        color: "bg-blue-100",
        textColor: "text-blue-600"
      },
      {
        id: 2,
        title: "Shortlisted Applications",
        count: "5",
        icon: <FileText size={20} className="text-yellow-500" />,
        color: "bg-yellow-100",
        textColor: "text-yellow-600"
      },
      {
        id: 3,
        title: "Shortlisted For Interviews",
        count: "3",
        icon: <Users size={20} className="text-purple-500" />,
        color: "bg-purple-100",
        textColor: "text-purple-600"
      },
      {
        id: 4,
        title: "Final Round Interviews",
        count: "2",
        icon: <Users size={20} className="text-orange-500" />,
        color: "bg-orange-100",
        textColor: "text-orange-600"
      },
      {
        id: 5,
        title: "Offer Letter Confirmed",
        count: "1",
        icon: <CheckCircle size={20} className="text-green-500" />,
        color: "bg-green-100",
        textColor: "text-green-600"
      }
    ];
  
    return (
      <>
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <Layout isExpanded={isExpanded} handleOpenModal={handleOpenModal}>
          <StatusBoard statusData={statusData} />
          <Modal
           isOpen={isModalOpen}
           onClose={handleCloseModal}
           title="Add New Job Application"
           showSaveBtn={true}
           saveButtonText="Save Job Application"
           onSubmitClicked={() => childRef.current?.submit()}
           >
            <JobApplicationForm ref={childRef} onClose={handleCloseModal} />
          </Modal>
        </Layout>
      </>
    );
}

export default JobTracker;