const forgotPasswordValidator = (data) => {
  const errors = {};
  if (!data.email) {
    errors.email = "O email é obrigatório";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    errors.email = "Insira um email válido";
  }
  return errors;
};

export default forgotPasswordValidator;
