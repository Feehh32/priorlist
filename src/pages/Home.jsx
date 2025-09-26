import { Link } from "react-router-dom";
import HeroImage from "../assets/hero-image.png";
import { useEffect } from "react";

const Home = () => {
  // dinamic title
  useEffect(() => {
    document.title = "PriorList | Lista de tarefas avançadas";
  }, []);
  return (
    <div className="px-4 md:px-16 py-16">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-4xl md:text-6xl font-bold font-secondary text-primary mb-6">
            PriorList
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-secondary mb-8">
            Organize suas tarefas de forma rápida, simples e eficiente.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-primary text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              Começar Agora
            </Link>
            <Link
              to="/login"
              className="border border-primary text-primary px-8 py-3 rounded-lg shadow-md hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
        <div className="md:flex-1 flex justify-center">
          <img
            src={HeroImage}
            alt="Pessoa organizando tarefas em uma lista digital"
            className="w-full max-w-md"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-primary mb-2">✨ Simples</h3>
          <p className="text-gray-600 font-secondary">
            Interface direta e fácil de usar para organizar suas tarefas.
          </p>
        </div>
        <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-primary mb-2">⚡ Rápido</h3>
          <p className="text-gray-600 font-secondary">
            Crie, edite e acompanhe tudo em poucos cliques.
          </p>
        </div>
        <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-primary mb-2">💡 Gratuito</h3>
          <p className="text-gray-600 font-secondary">
            Utilize sem custos e mantenha suas prioridades sempre à mão.
          </p>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Pronto para organizar sua vida?
        </h2>
        <Link
          to="/register"
          className="bg-primary text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-semibold"
        >
          Criar Conta Gratuitamente
        </Link>
      </section>
    </div>
  );
};

export default Home;
