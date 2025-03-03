import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnalyticsPage from "./pages/AnalyticsPage";
import JobTracker from "./pages/JobTracker";
function App() {
  return (
    <Routes>
      <Route path="/" element={<JobTracker />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}

export default App;
