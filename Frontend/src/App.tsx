import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnalyticsPage from "./pages/AnalyticsPage";
import JobTracker from "./pages/JobTracker";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
    <AuthProvider>
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
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
