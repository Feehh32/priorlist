import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import resetPasswordValidator from "../utils/updatePasswordValidator";
import PageTransition from "../components/pageTransition/PageTransition";
import { MdOutlineArrowBack } from "react-icons/md";
import FormInput from "../components/input/FormInput";
import Spinner from "../components/UI/spinner";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { updatePassword, error, loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Redefinir senha | PriorList";
  }, []);

  const handleChange = (e) => {
    setPasswordData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = resetPasswordValidator(passwordData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) return;

    // Send the data to update password
    const res = await updatePassword(passwordData.password);
    if (!res.success) return;
    setSuccess({
      success: true,
      message:
        "Senha redefinida com sucesso! Você será redirecionado para o login.",
    });
    setTimeout(() => {
      setPasswordData({ password: "", confirmPassword: "" });
      setFormErrors({});
      navigate("/login");
    }, 3000);
  };
  return (
    <PageTransition>
      <section className="min-h-screen flex justify-center items-center flex-col bg-gray-50 p-8 md:p-16">
        {success && (
          <p
            className="text-green-700 text-sm text-center mb-4 p-3 bg-green-100 rounded-lg border border-green-300 shadow-sm"
            role="status"
          >
            {success.message}
          </p>
        )}
        <div className="bg-white max-w-2xl w-full shadow-md rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-medium text-center text-primary my-4 md:my-8">
            Insira sua nova senha
          </h1>
          <p className="text-secondary text-base text-center max-w-md mx-auto mb-4 md:mb-8">
            Sua nova senha deve ter pelo menos 6 caracteres
          </p>
          <form
            className="px-8 pb-8 grid gap-4"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormInput
              type="password"
              id="password"
              label="Nova senha"
              placeholder="Insira sua nova senha"
              onChange={handleChange}
              value={passwordData.password}
              error={formErrors.password}
            />
            <FormInput
              label="Confirmar senha"
              type="password"
              placeholder="Confirme sua nova senha"
              id="confirmPassword"
              onChange={handleChange}
              value={passwordData.confirmPassword}
              error={formErrors.confirmPassword}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <Spinner size="w-6 h-6" color="white" />
              ) : (
                "Redefinir senha"
              )}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">
                {error}
              </p>
            )}
          </form>
          <Link
            className="text-primary font-medium text-sm hover:underline text-center flex justify-center items-center gap-2 mb-4 md:mb-8 max-w-fit m-auto"
            to={"/login"}
          >
            <MdOutlineArrowBack size={18} aria-hidden="true" />
            <span> Voltar ao login</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default UpdatePassword;
