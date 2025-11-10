import { Link } from "react-router-dom";
import FormInput from "../components/input/FormInput";
import { useState, useEffect } from "react";
import Spinner from "../components/UI/spinner";
import loginValidator from "../utils/loginValidator";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PageTransition from "../components/pageTransition/PageTransition";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const formVariants = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/tasks";

  // dinamic title
  useEffect(() => {
    document.title = "PriorList | Entrar com email e senha";
  }, []);

  // Function to control the inputs
  const handleChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator(loginData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Send the data to the backend
    const res = await login(loginData);
    if (res) {
      navigate(from, { replace: true });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <motion.section
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-sky-700 relative"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
          <h2 className="text-white text-4xl font-secondary font-semibold max-w-md text-center relative z-10">
            Organize suas tarefas de forma simples
          </h2>
        </motion.section>
        <motion.section
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center bg-transparent md:bg-white"
        >
          <div className="w-full max-w-md shadow-md rounded-2xl md:p-12">
            <Link
              to="/"
              className="text-lg text-primary font-semibold text-center pt-4 pb-2 font-logo block"
              aria-label="Priolist - Página inicial"
            >
              Priorlist
            </Link>
            <h1 className=" text-2xl md:text-3xl font-medium text-center text-secondary mb-8">
              Faça login na sua conta
            </h1>
            <form
              onSubmit={handleSubmit}
              className="px-8 pb-8 grid gap-4"
              noValidate
            >
              <FormInput
                label="Email"
                placeholder="Seu email"
                id="email"
                type="email"
                onChange={handleChange}
                value={loginData.email}
                error={formErrors.email}
              />
              <FormInput
                label="Senha"
                placeholder="Sua senha"
                id="password"
                type="password"
                autoComplete="on"
                onChange={handleChange}
                value={loginData.password}
                error={formErrors.password}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Spinner color="border-gray-200" /> : "Entrar"}
              </button>
              {error && (
                <p className="text-red-500 text-sm text-center" role="alert">
                  Email ou senha incorretos
                </p>
              )}
              <p className="text-sm text-center text-gray-600">
                Ainda nao tem conta?{" "}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Registre-se aqui
                </Link>
              </p>

              <Link
                to="/forgot-password"
                className="text-primary font-medium text-sm hover:underline text-center block"
              >
                Esqueceu sua senha?
              </Link>
            </form>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default Login;
