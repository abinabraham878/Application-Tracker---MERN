import { JobApplication } from "./JobTrackerContext";

type State = {
  applications: JobApplication[];
  error: null | string;
  loading: boolean;
};

type Action = 
  | { type: "GET_ALL_APPLICATIONS"; payload: JobApplication[] }
  | { type: "SAVE_JOB_APPLICATION"; payload: JobApplication}
  | { type: "UPDATE_JOB_APPLICATION"; payload: JobApplication}
  | { type: "ERROR"; payload: string };

const JobTrackerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_ALL_APPLICATIONS":
      return {
        ...state,
        applications: action.payload || [], // Ensure we have a fallback
        error: null,
        loading: false,
      };
    case "SAVE_JOB_APPLICATION":
      return {
        ...state,
        applications: [action.payload, ...state.applications],
        error: null,
      };
    case "UPDATE_JOB_APPLICATION":
      // Create a new array to maintain immutability
      const updatedApplications = state.applications.map(job => 
        job._id === action.payload._id ? action.payload : job
      );
      return {
        ...state,
        applications: updatedApplications,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default JobTrackerReducer;