import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="tasks" element={<Tasks />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
