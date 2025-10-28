import { Link } from "react-router-dom";
import FormInput from "../components/input/FormInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import PageTransition from "../components/pageTransition/PageTransition";

const ForgotPassword = () => {
  return (
    <PageTransition>
      <section className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16">
        <p
          className="text-green-700 text-sm text-center mb-4 p-2 bg-green-200 rounded-lg border border-green-300"
          role="status"
        >
          Mensagem de feedBack
        </p>
        <div className="bg-white max-w-2xl w-full shadow-md rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-medium text-center text-primary my-4 md:my-8">
            Recuperar sua senha
          </h1>
          <p className="text-secondary text-base text-center max-w-md mx-auto mb-4 md:mb-8">
            Insira seu email no campo abaixo, em seguida lhe enviaremos um link
            para redefinir sua senha.
          </p>
          <form className="px-8 pb-8 grid gap-4" noValidate>
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Seu Email"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
            >
              Enviar
            </button>
            <p className="text-red-500 text-sm text-center " role="alert">
              Campo para erro
            </p>
          </form>

          <Link
            className="text-primary font-medium text-sm hover:underline text-center flex justify-center items-center gap-2 mb-4 md:mb-8 max-w-fit m-auto"
            to={"/login"}
          >
            <FaArrowLeftLong aria-hidden="true" />
            <span> Voltar ao login</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default ForgotPassword;
