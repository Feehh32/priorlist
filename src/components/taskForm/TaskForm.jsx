import PropTypes from "prop-types";
import FormInput from "../input/FormInput";
import { useEffect, useState, useRef } from "react";
import taskFormValidator from "../../utils/taskFormValidator";
import Spinner from "../UI/spinner";

const TaskForm = ({ onSubmit, modalMode, taskToEdit, loading }) => {
  const [formErrors, setFormErrors] = useState({});
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: null,
    priority: 3,
    completed: false,
    archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Using a util function to validate the title field
    const errors = taskFormValidator(formData);
    setFormErrors(errors);

    // if errors object is not empty, return e stop the function
    if (Object.keys(errors).length > 0) return;

    await onSubmit(formData);
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
        value={formData.deadline ?? ""}
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
            value={3}
            checked={formData.priority === 3}
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
            value={2}
            checked={formData.priority === 2}
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
            value={1}
            checked={formData.priority === 1}
            onChange={handleChange}
            className="appearance-none w-4 h-4 rounded-full border-2 border-red-500 checked:bg-red-500"
          />
          Alta
        </label>
      </fieldset>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md flex items-center justify-center"
      >
        {loading ? (
          <>
            <Spinner color="white" />
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
