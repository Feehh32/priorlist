const loginValidator = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "O email é obrigatório";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    errors.email = "Insira um email válido";
  }

  if (!data.password) {
    errors.password = "A senha é obrigatória";
  } else if (data.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  return errors;
};

export default loginValidator;
