import { Link } from "react-router-dom";
import FormInput from "../components/input/FormInput";

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-8 md:p-16">
      <div className=" bg-white max-w-2xl w-full shadow-md rounded-2xl">
        <Link
          to="/"
          className="text-lg text-primary font-semibold text-center pt-4 pb-2 font-logo block"
          aria-label="Priolist - Página inicial"
        >
          Priorlist
        </Link>
        <h2 className=" text-2xl md:text-3xl font-medium text-center text-secondary mb-8">
          Crie aqui sua conta gratuitamente
        </h2>
        <form className="px-8 pb-8 grid gap-4">
          <FormInput label="Nome" placeholder="Seu nome" id="name" />
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
          <FormInput
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            id="confirm-password"
            type="password"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md"
          >
            Registrar
          </button>
          <p className="text-sm text-center text-gray-600">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Entre aqui
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
