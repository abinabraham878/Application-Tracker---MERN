import { useContext, useEffect, useState } from "react";
import Table from "../components/Table"
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

interface JobApplication {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobLocation: string;
    jobType: string;
    status: string;
    createdAt: string;
  }

const JobApplicationTable = () => {

    const [tableColumns] = useState([
        { title: "Job Title", key: "jobTitle" },    
        { title: "Company Name", key: "companyName" },
        { title: "Job Location", key: "jobLocation" },
        { title: "Job Type", key: "jobType" },
        { title: "Status", key: "status" },
        { title: "Created At", key: "createdAt" },
    ]);

    const { user } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const [ applications, setApplications ] = useState<JobApplication[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/job-application/all/" + user?.userId);
                setApplications(response.data);
            } catch (error) {
                addToast("error", "Error fetching job applications");
            }
        };

        fetchData();
    }, [])

  return (
    <Table columns={tableColumns} rowData={applications}/>
  )
}

export default JobApplicationTable;