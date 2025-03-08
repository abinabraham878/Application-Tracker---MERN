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
}

const initialState: { applications: JobApplication[], error: null | string, loading: boolean } = {
    applications: [],
    error: null,
    loading: true
  };

interface JobApplicationProviderProps {
  children: ReactNode;
}

interface JobApplicationContextType {
    applications: JobApplication[];
    getAllApplications: () => void;
    saveJobApplication: (data: JobApplication) => void;
}

export const JobTrackerContext = createContext<JobApplicationContextType | undefined>(undefined);

export const JobTrackerProvider = ({ children }: JobApplicationProviderProps) => {
    
    const { user } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const [ state, dispatch ] = useReducer(JobTrackerReducer, initialState);

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
        console.log("Saving job application", data);
    }
    
    return (
        <JobTrackerContext.Provider value={{
            applications: state.applications,
            getAllApplications,
            saveJobApplication
        }}>
            {children}
        </JobTrackerContext.Provider>
    );
};