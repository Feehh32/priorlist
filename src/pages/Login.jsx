import { Link } from "react-router-dom";
import FormInput from "../components/input/FormInput";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-sky-700 relative">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300C200 400 400 200 800 300V600H0V300Z"
            fill="rgba(255,255,255,0.1)"
          />
          <path
            d="M0 400C250 300 550 500 800 400V600H0V400Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
        <h1 className="text-white text-4xl font-logo font-semibold max-w-md text-center relative z-10">
          Organize suas tarefas de forma simples
        </h1>
      </section>
      <section className="flex items-center justify-center bg-transparent md:bg-white">
        <div className="w-full max-w-md shadow-md rounded-2xl md:p-12">
          <Link
            to="/"
            className="text-lg text-primary font-semibold text-center pt-4 pb-2 font-logo block"
            aria-label="Priolist - Página inicial"
          >
            Priorlist
          </Link>
          <h2 className=" text-2xl md:text-3xl font-medium text-center text-secondary mb-8">
            Faça login na sua conta
          </h2>
          <form className="px-8 pb-8 grid gap-4">
            <FormInput
              label="Email"
              placeholder="Seu email"
              id="email"
              type="email"
            />
            <FormInput
              label="Senha"
              placeholder="Sua senha"
              id="password"
              type="password"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md"
            >
              Entrar
            </button>
            <p className="text-sm text-center text-gray-600">
              Ainda nao tem conta?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Registre-se aqui
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
