import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Tasks = lazy(() => import("./pages/Tasks"));
const About = lazy(() => import("./pages/About"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const AccountDeactivated = lazy(() => import("./pages/AccountDeactivated"));

import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import DeactivatedRoute from "./components/Routes/DeactivatedRoute";

import { AnimatePresence } from "framer-motion";
import Spinner from "./components/UI/spinner";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Spinner size="w-12 h-12" color="primary" />
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="about" element={<About />} />
              <Route path="update-password" element={<UpdatePassword />} />
              <Route element={<DeactivatedRoute />}>
                <Route
                  path="account-deactivated"
                  element={<AccountDeactivated />}
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="tasks" element={<Tasks />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
