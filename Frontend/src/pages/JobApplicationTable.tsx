import { useContext, useEffect, useState } from "react";
import Table from "../components/Table"
import { JobTrackerContext } from "../context/JobTrackerContext";


const JobApplicationTable = ({ setIsActionClicked }: any) => {

    const [tableColumns] = useState([
        { title: "Job Title", key: "jobTitle" },    
        { title: "Company Name", key: "companyName" },
        { title: "Job Location", key: "jobLocation" },
        { title: "Job Type", key: "jobType" },
        { title: "Status", key: "status" },
        { title: "Created At", key: "createdAt" },
    ]);

    const onActionBtnCLicked = () =>{

    };

    const actionBUttons = [
      {
        buttonName: 'Change Status',
        onClick: onActionBtnCLicked
      }
    ];

    const { applications, getAllApplications, setRowDataId } = useContext(JobTrackerContext);

    useEffect(() => {
        getAllApplications();
    }, []);

  return (
    <Table columns={tableColumns} rowData={applications} setIsActionClicked={setIsActionClicked} setRowDataId={setRowDataId}/>
  )
}

export default JobApplicationTable;