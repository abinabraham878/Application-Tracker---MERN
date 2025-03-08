import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import AnalyticsPage from "./pages/AnalyticsPage";
import AuthPage from "./pages/AuthPage";
import JobTracker from "./pages/JobTracker";
import ProfilePage from "./pages/ProfilePage";
import { JobTrackerProvider } from "./context/JobTrackerContext";
function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <JobTrackerProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <JobTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </JobTrackerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
