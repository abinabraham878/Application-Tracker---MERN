import { JobApplication } from "./JobTrackerContext";

type State = {
  applications: JobApplication[];
  jobStatusCount: { [key: string]: number }; 
  error: null | string;
  loading: boolean;
};

type StatusCount = {
  [key: string]: number; 
};

type Action = 
  | { type: "GET_ALL_APPLICATIONS"; payload: JobApplication[] }
  | { type: "SAVE_JOB_APPLICATION"; payload: JobApplication}
  | { type: "UPDATE_JOB_APPLICATION"; payload: JobApplication}
  | { type: "UPDATE_JOB_APPLICATION_COUNT"; payload: StatusCount}
  | { type: "ERROR"; payload: string };

const JobTrackerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_ALL_APPLICATIONS":
      return {
        ...state,
        applications: action.payload || [], 
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
      const updatedApplications = state.applications.map(job => 
        job._id === action.payload._id ? action.payload : job
      );
      return {
        ...state,
        applications: updatedApplications,
        error: null,
      };
    case "UPDATE_JOB_APPLICATION_COUNT":
      return {
        ...state,
        jobStatusCount: action.payload,
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