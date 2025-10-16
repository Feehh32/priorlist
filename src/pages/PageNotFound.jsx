import { Link } from "react-router-dom";
import NotFoundImg from "../assets/404-img.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PageTransition from "../components/pageTransition/PageTransition";

const PageNotFound = () => {
  const { user } = useContext(AuthContext);
  return (
    <PageTransition>
      <div className="relative min-h-screen md:grid md:grid-cols-2">
        <main
          className="flex-1 flex  items-center justify-center text-center p-6"
          role="status"
          tabIndex={-1}
        >
          <div className="max-w-md mt-8 md:mt-0">
            <h2 className="text-6xl md:text-9xl font-logo font-bold text-primary mb-4 hover:text-blue-700 transition">
              404
            </h2>
            <h1 className="text-2xl md:text-3xl font-semibold font-logo text-secondary mb-6">
              Página Não Encontrada
            </h1>
            <p className="md:text-xl text-base text-primary mb-6">
              Ops! A página que você está procurando não existe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={user ? "/tasks" : "/"}
                className="px-6 py-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {user
                  ? "Volte para a página suas tarefas"
                  : "Volte para a página principal"}
              </Link>
            </div>
          </div>
        </main>
        <img
          src={NotFoundImg}
          alt="Página não encontrada"
          className="md:w-auto md:z-0 md:opacity-100 top-0 right-0 object-cover w-full h-screen absolute -z-10  opacity-60"
        />
      </div>
    </PageTransition>
  );
};

export default PageNotFound;
