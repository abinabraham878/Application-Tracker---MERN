import { useContext, useEffect, useState } from "react";
import Table from "../components/Table"
import { JobTrackerContext } from "../context/JobTrackerContext";


const JobApplicationTable = ({ setIsActionClicked }: any) => {

    const [tableColumns] = useState([
        { title: "Job Title", key: "jobTitle", filter: false },    
        { title: "Company Name", key: "companyName", filter: true },
        { title: "Job Location", key: "jobLocation", filter: false },
        { title: "Job Type", key: "jobType", filter: false },
        { title: "Status", key: "status", filter: true },
        { title: "Created At", key: "createdAt", filter: false },
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