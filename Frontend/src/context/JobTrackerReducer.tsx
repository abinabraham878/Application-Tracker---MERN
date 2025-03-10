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
        applications: action.payload,
        loading: false,
      };
    case "SAVE_JOB_APPLICATION":
      return {
        ...state,
        applications: [action.payload, ...state.applications],
      }
    case "UPDATE_JOB_APPLICATION":
      const jobIndex = state.applications.findIndex(job => job._id == action.payload._id);
      state.applications[jobIndex] = action.payload;
      return {
        ...state,
        applications: state.applications
      }
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