import { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
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
    
    const [loading, setLoading] = useState(true);
    
    const { 
        applications, 
        getAllApplications, 
        setRowDataId, 
        getJobApplicationByCriteria 
    } = useContext(JobTrackerContext);

    useEffect(() => {
        fetchApplications();
    }, []);

    // Fixed to properly handle async operations
    const fetchApplications = async (filters?: any[]) => {
        setLoading(true);
        try {
            if (filters && filters.length > 0) {
                await getJobApplicationByCriteria(filters);
            } else {
                await getAllApplications();
            }
            // Don't return applications immediately as state might not be updated yet
            setLoading(false);
            return true; // Return success instead of potentially stale data
        } catch (error) {
            console.error("Error fetching applications:", error);
            setLoading(false);
            return false;
        }
    };

    return (
        <div>
            <Table
                columns={tableColumns}
                rowData={applications || []} // Add a fallback empty array
                maxHeight="600px"
                setIsActionClicked={setIsActionClicked}
                setRowDataId={setRowDataId}
                fetchData={fetchApplications}
                loading={loading}
            />
        </div>
    );
};

export default JobApplicationTable;