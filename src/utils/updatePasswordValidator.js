const updatePasswordValidator = (data) => {
  const errors = {};
  if (!data.password) {
    errors.password = "A senha é obrigatória";
  } else if (data.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "A confirmação de senha é obrigatória";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "As senhas devem ser iguais";
  }
  return errors;
};

export default updatePasswordValidator;
