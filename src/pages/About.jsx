import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "../components/pageTransition/PageTransition";
import Spinner from "../components/UI/spinner";

const About = () => {
  // dinamic title
  useEffect(() => {
    document.title = "PriorList | Sobre";
  }, []);

  return (
    <PageTransition>
      <section className="relative min-h-screen md:flex justify-center px-4 md:px-0">
        <div className="w-full h-full ">
          <h1 className="text-3xl md:text-6xl font-secondary text-align-center font-semibold text-primary mb-6 mt-8 text-center ">
            Sobre o Priorlist
          </h1>
          <svg
            className="absolute hidden md:block inset-0 w-full h-full rotate-180"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 300C200 400 400 200 800 300V600H0V300Z"
              fill="rgba(59,130,246,0.08)"
            />
            <path
              d="M0 400C250 300 550 500 800 400V600H0V400Z"
              fill="rgba(59,130,246,0.06)"
            />
          </svg>
        </div>

        <section className=" max-w-3xl bg-white/80 shadow-md rounded-2xl py-6 px-4 md:p-8 md:absolute md:top-1/4">
          <h2 className="text-2xl md:text-3xl font-medium text-primary mb-6">
            Produtividade simplificada
          </h2>

          <div className="mb-8 text-secondary">
            <p className="mb-4">
              O Priolist é uma ferramenta simples e eficiente para gerenciar
              suas tarefas diárias. Organize suas prioridades, acompanhe seu
              progresso e mantenha o foco no que realmente importa.
            </p>

            <p>
              Nosso objetivo é ajudá-lo a aumentar sua produtividade e reduzir o
              estresse, proporcionando um ambiente limpo e fácil de usar para
              que você possa focar no que realmente importa.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Voltar à Home
            </Link>
          </div>
        </section>
      </section>
    </PageTransition>
  );
};

export default About;
