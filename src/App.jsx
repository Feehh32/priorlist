import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="about" element={<About />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="tasks" element={<Tasks />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
