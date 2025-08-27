import PropTypes from "prop-types";
import FormInput from "../input/FormInput";

const TaskForm = ({ onSubmit, modalMode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmit({
      title: data.get("title"),
      description: data.get("description"),
      deadline: data.get("deadline"),
      priority: data.get("priority"),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormInput
        label="Título da Tarefa"
        placeholder="Digite sua tarefa"
        id="task"
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
        />
      </label>
      <FormInput
        label="Data Limite"
        placeholder="Estabeleça uma data limite"
        id="deadline"
        type="date"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer font-secondary shadow-md"
      >
        {modalMode === "create" ? "Criar Tarefa" : "Salvar Alterações"}
      </button>
    </form>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  onSubmit: PropTypes.func,
};
