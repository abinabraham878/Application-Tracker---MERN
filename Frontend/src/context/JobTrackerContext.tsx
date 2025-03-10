import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ToastContext } from "./ToastContext";
import axios from "../services/axios";
import JobTrackerReducer from "./JobTrackerReducer";

export interface JobApplication {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobLocation: string;
    jobType: string;
    status: string;
    createdAt: string;
    userId: string;
}

const initialState: { applications: JobApplication[], error: null | string, loading: boolean } = {
    applications: [],
    error: null,
    loading: true
  };

interface JobApplicationProviderProps {
  children: ReactNode;
}

interface StatusCount {
    [key: string]: number;
}

interface JobApplicationContextType {
    applications: JobApplication[];
    getAllApplications: () => void;
    saveJobApplication: (data: JobApplication) => void;
    updateJobApplication: (data: JobApplication) => void;
    setRowDataId: (id: string) => void;
    jobStatusCount: () => void;
    statusCount: StatusCount

}

export const JobTrackerContext = createContext<JobApplicationContextType | undefined>(undefined);

export const JobTrackerProvider = ({ children }: JobApplicationProviderProps) => {
    
    const { user } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const [rowDataId, setRowDataId] = useState<string | null>(null);
    const [ state, dispatch ] = useReducer(JobTrackerReducer, initialState);
    const [ statusCount, setStatusCount ] = useState({});

    const getAllApplications = async () => {
        try {
            const response = await axios.get("/api/job-application/all/" + user?.userId);
            dispatch({
                type: "GET_ALL_APPLICATIONS",
                payload: response.data
            })
        } catch (error) {
            addToast("error", "Error fetching job applications");
        }
    };

    const saveJobApplication = async (data: JobApplication) => {
        try {
            
            data = {
                ...data,
                userId: user?.userId,
            }

            const response = await axios.post('/api/job-application/create', data);
            if (response.data.success) {
                addToast("success", "Job application saved successfully");
                dispatch({
                    type: "SAVE_JOB_APPLICATION",
                    payload: response.data.data
                })
            }
        } catch (error){
            addToast("error", "Error saving job application");
        } 
    };

    const updateJobApplication = async (data: JobApplication) => {
        try{
            const response = await axios.put('/api/job-application/update/'+rowDataId, data);
            if(response.data.success){
                addToast('success', "Job Application updated successfully");
                dispatch({
                    type: "UPDATE_JOB_APPLICATION",
                    payload: response.data.data
                })
            }
        } catch(error) {
            addToast("error", "Error updating job application");
        }
    };

    const jobStatusCount = async() => {
        try {
            const response = await axios.get('/api/job-application/status-count/'+user?.userId);
            if(response.data.data){
                setStatusCount(response.data.data);
            }
        } catch(error) {
            addToast("error", "Error getting job application count");
        }
    };
    
    return (
        <JobTrackerContext.Provider value={{
            applications: state.applications,
            getAllApplications,
            saveJobApplication,
            updateJobApplication,
            setRowDataId,
            jobStatusCount,
            statusCount
        }}>
            {children}
        </JobTrackerContext.Provider>
    );
};