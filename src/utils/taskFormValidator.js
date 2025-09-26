const taskFormValidator = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) {
    errors.title = "O titulo é obrigatorio";
  } else if (data.title.length > 150) {
    errors.title = "O título não pode ter mais de 150 caracteres";
  }

  return errors;
};

export default taskFormValidator;
