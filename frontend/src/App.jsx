import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import CreateTaskForm from "./features/adminFeatures/CreateTaskForm";
import AdminTasklist from "./features/adminFeatures/AdminTasklist";
import UserPage from "./pages/UserPage";
import UserTasklist from "./features/userFeatures/UserTaskList";
import AdminDashboard from "./features/adminFeatures/AdminDashboard";
import UserDashboard from "./features/userFeatures/UserDashboard";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<HomePage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="add-task" element={<CreateTaskForm />} />
            <Route path="task-list" element={<AdminTasklist />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
          <Route
            path="user"
            element={
              <ProtectedRoute role="user">
                <UserPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="task-list" element={<UserTasklist />} />
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
