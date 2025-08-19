import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";

const MainLayout = () => {
  // hiding header and footer in login and register
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow p-8">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
