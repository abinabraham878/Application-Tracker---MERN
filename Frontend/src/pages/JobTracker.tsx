
import { useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import StatusBoard from '../components/StatusBoard';
import { CheckCircle, FileText, FileX, Users } from 'lucide-react';
import Modal from '../components/Modal';
import JobApplicationForm from './JobApplicationForm';
import JobApplicationTable from './JobApplicationTable';
import { JOB_STATUS } from '../Constants/constants';

const JobTracker = () => {
    const [isExpanded, setisExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActionCLicked, setIsActionClicked] = useState(false);
    const childRef = useRef<any>(null);
    const formFields = [
        { id: "jobTitle", name: "jobTitle", label: "Job Title", type: "text", required: true },
        { id: "companyName", name: "companyName", label: "Company Name", type: "text", required: true },
        { id: "jobLocation", name: "jobLocation", label: "Job Location", type: "text", required: true },
        {
            id: "jobType",
            name: "jobType",
            label: "Job Type",
            type: "select",
            required: true,
            options: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"]
        },
        { id: "usedResume", name: "usedResume", label: "Resume Used (Optional)", type: "text" },
        { id: "usedCoverLetter", name: "usedCoverLetter", label: "Cover Letter Used (Optional)", type: "text" },
        {
            id: "status",
            name: "status",
            label: "Application Status",
            type: "select",
            required: true,
            options: JOB_STATUS
        }
    ];

    const statusFormFields = [
      {
          id: "status",
          name: "status",
          label: "Application Status",
          type: "select",
          required: true,
          options: JOB_STATUS
      }
  ];

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setIsActionClicked(false)
    };

    const toggleSidebar = () => {
      setisExpanded(!isExpanded);
    };

    const statusData: any = [
      {
        id: 1,
        title: "Sent Applications",
        dataKey: "Sent Application",
        count: 0,
        icon: <FileText size={20} className="text-blue-500" />,
        color: "bg-blue-100",
        textColor: "text-blue-600"
      },
      {
        id: 2,
        title: "Shortlisted Applications",
        dataKey: "Shortlisted",
        count: 0,
        icon: <FileText size={20} className="text-yellow-500" />,
        color: "bg-yellow-100",
        textColor: "text-yellow-600"
      },
      {
        id: 3,
        title: "Shortlisted For Interviews",
        dataKey: "Interview Scheduled",
        count: 0,
        icon: <Users size={20} className="text-purple-500" />,
        color: "bg-purple-100",
        textColor: "text-purple-600"
      },
      {
        id: 4,
        title: "Shortlisted For Technical Interview",
        dataKey: "Technical Interview",
        count: 0,
        icon: <Users size={20} className="text-purple-500" />,
        color: "bg-purple-100",
        textColor: "text-purple-600"
      },
      {
        id: 5,
        title: "Final Round Interviews",
        dataKey: "Final Interview",
        count: 0,
        icon: <Users size={20} className="text-orange-500" />,
        color: "bg-orange-100",
        textColor: "text-orange-600"
      },
      {
        id: 6,
        title: "Offer Letter Confirmed",
        dataKey: "Offer Confirmed",
        count: 0,
        icon: <CheckCircle size={20} className="text-green-500" />,
        color: "bg-green-100",
        textColor: "text-green-600"
      },
      {
        id: 7,
        title: "Rejected",
        dataKey: "Rejected",
        count: 0,
        icon: <FileX size={20} className="text-red-500" />,
        color: "bg-red-100",
        textColor: "text-red-600"
      }
    ];
  
    return (
      <>
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <Layout isExpanded={isExpanded} handleOpenModal={handleOpenModal}>
          <StatusBoard statusData={statusData} />
          <JobApplicationTable setIsActionClicked={setIsActionClicked}/>
          <Modal
           isOpen={isModalOpen}
           onClose={handleCloseModal}
           title="Add New Job Application"
           showSaveBtn={true}
           saveButtonText="Save Job Application"
           onSubmitClicked={() => childRef.current?.submit('save')}
           >
            <JobApplicationForm ref={childRef} onClose={handleCloseModal} formFields={formFields}/>
          </Modal>

          <Modal isOpen={isActionCLicked}
           onClose={handleCloseModal}
           title="Change Job Status"
           showSaveBtn={true}
           saveButtonText="Save Job Status"
           onSubmitClicked={() => childRef.current?.submit('update')}
           modalWidth='500px'>
            <JobApplicationForm ref={childRef} onClose={handleCloseModal} formFields={statusFormFields} />
           </Modal>
        </Layout>
      </>
    );
}

export default JobTracker;