import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks1" element={<TaskPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
        </Routes>
     
    </AuthProvider>
  );
}

export default App;
