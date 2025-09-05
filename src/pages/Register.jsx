import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/input/FormInput";
import { useState } from "react";
import useApiRequest from "../hooks/useApiRequest";
import Spinner from "../components/UI/spinner";
import registerValidator from "../utils/registerValidators";

const Register = () => {
  const [bodyData, setBodyData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Custom hook to handle API requests
  const { request, error, loading } = useApiRequest();

  const navigate = useNavigate();

  // Function to control the inputs
  const handleChange = (e) => {
    setBodyData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = registerValidator(bodyData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) return;

    // take off the confirm password
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...userData } = bodyData;

    // Send the data to the backend
    try {
      await request("users", "POST", userData);
      setSuccess("Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setSuccess("");
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16">
      {success && (
        <p className="text-green-500 text-sm text-center mb-2 p-2 bg-green-200 rounded-lg border border-green-300">
          {success}
        </p>
      )}
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
        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 grid gap-4"
          noValidate
        >
          {/* Every FormInput will be controlled by data object */}
          <FormInput
            label="Nome"
            placeholder="Seu nome"
            id="name"
            value={bodyData.name}
            onChange={handleChange}
            error={formErrors["name"]}
          />
          <FormInput
            label="Email"
            placeholder="Seu email"
            id="email"
            value={bodyData.email}
            onChange={handleChange}
            type="email"
            error={formErrors["email"]}
          />
          <FormInput
            label="Senha"
            placeholder="Sua senha"
            id="password"
            value={bodyData.password}
            onChange={handleChange}
            type="password"
            error={formErrors["password"]}
          />
          <FormInput
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            id="confirmPassword"
            value={bodyData.confirmPassword}
            onChange={handleChange}
            type="password"
            error={formErrors["confirmPassword"]}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Spinner color="border-gray-200" /> : "Registrar"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
