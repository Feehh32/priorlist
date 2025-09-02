const registerValidator = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = "O nome é obrigatório";
  }

  if (!data.email) {
    errors.email = "O email é obrigatório";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    errors.email = "Insira um email válido";
  }

  if (!data.password) {
    errors.password = "A senha é obrigatório";
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

export default registerValidator;
