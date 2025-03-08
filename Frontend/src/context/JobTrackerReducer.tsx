import { JobApplication } from "./JobTrackerContext";

type State = {
  applications: JobApplication[];
  error: null | string;
  loading: boolean;
};

type Action = 
  | { type: "GET_ALL_APPLICATIONS"; payload: JobApplication[] }
  | { type: "ERROR"; payload: string };

const JobTrackerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_ALL_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
        loading: false,
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