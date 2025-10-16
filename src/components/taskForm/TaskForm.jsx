import PropTypes from "prop-types";
import FormInput from "../input/FormInput";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import taskFormValidator from "../../utils/taskFormValidator";
import Spinner from "../UI/spinner";

const TaskForm = ({ onSubmit, modalMode, taskToEdit }) => {
  const { user } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    userId: user.id,
    title: "",
    description: "",
    deadline: "",
    priority: "low",
    completed: false,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData((prev) => ({
        ...prev,
        ...taskToEdit,
      }));
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Using a util function to validate the title field
    const errors = taskFormValidator(formData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormInput
        label="Título da Tarefa"
        placeholder="Digite sua tarefa"
        id="title"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
        ref={titleInputRef}
      />
      <label
        className="text-text-main font-semibold font-secondary block"
        htmlFor="description"
      >
        Descrição
        <textarea
          className="block border border-input-border rounded-lg w-full px-4 py-3 font-normal focus:border-primary outline-none focus:border-2 focus:ring-2 focus:ring-primary/40 font-primary shadow-sm bg-bg-main"
          placeholder="Descreva a tarefa..."
          rows={3}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <FormInput
        label="Data Limite"
        placeholder="Estabeleça uma data limite"
        id="deadline"
        value={formData.deadline}
        type="date"
        onChange={handleChange}
      />
      <fieldset className="flex gap-4 md:flex-row flex-col">
        <legend className="text-text-main font-semibold font-secondary block">
          Prioridade
        </legend>
        <label htmlFor="low" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="low"
            value="low"
            checked={formData.priority === "low"}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-green-500 checked:bg-green-500"
          />
          Baixa
        </label>
        <label htmlFor="medium" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="medium"
            value="medium"
            checked={formData.priority === "medium"}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-yellow-500 checked:bg-yellow-500"
          />
          Média
        </label>
        <label htmlFor="high" className="flex gap-2 items-center">
          <input
            type="radio"
            name="priority"
            id="high"
            value="high"
            checked={formData.priority === "high"}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-red-500 checked:bg-red-500"
          />
          Alta
        </label>
      </fieldset>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Spinner color="border-white" />
            <span className="sr-only">Enviando...</span>
          </>
        ) : modalMode === "create" ? (
          "Criar Tarefa"
        ) : (
          "Salvar Alterações"
        )}
      </button>
    </form>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  onSubmit: PropTypes.func,
};
