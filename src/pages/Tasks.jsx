import { useState } from "react";
import TaskForm from "../components/taskForm/TaskForm";
import TaskList from "../components/tasks/TaskList";
import Modal from "../components/modal/Modal";
import { MdSearch } from "react-icons/md";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar React",
      description: "Finalizar o módulo de hooks",
      deadline: "2025-08-25",
      priority: "high",
    },
    {
      id: 2,
      title: "Reunião com cliente",
      description: "Discutir ajustes no dashboard",
      deadline: "2025-08-28",
      priority: "medium",
    },
    {
      id: 3,
      title: "Aula de Hiking",
      description: "Período da manhã",
      deadline: "2025-08-29",
      priority: "low",
    },
  ]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
  };

  return (
    <section className="relative min-h-screen px-4 md:px-16 py-16">
      <svg
        className="absolute hidden md:block inset-0 w-full h-full rotate-180 -z-10"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 300C200 400 400 200 800 300V600H0V300Z"
          fill="rgba(59,130,246,0.08)"
        />
        <path
          d="M0 400C250 300 550 500 800 400V600H0V400Z"
          fill="rgba(59,130,246,0.06)"
        />
      </svg>
      <h1 className="text-2xl md:text-6xl text-primary font-secondary font-semibold text-center">
        Suas Tarefas
      </h1>
      <section className="flex flex-col items-center mt-8 md:mt-16 gap-4 w-full">
        <div className="w-full max-w-4xl flex justify-between flex-col md:flex-row">
          <div className="relative md:mb-0 mb-4">
            <MdSearch
              className="absolute md:right-4 top-1/2 transform -translate-y-1/2 right-4 text-primary opacity-70"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar tarefa..."
              className="w-full md:max-w-xs border border-input-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition cursor-pointer"
            onClick={() => {
              setShowModal(true);
              setModalMode("create");
              setTaskToEdit(null);
            }}
          >
            + Nova Tarefa
          </button>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md mt-2 max-w-4xl w-full ">
          <TaskList
            tasks={tasks}
            onEdit={(task) => {
              setModalMode("edit");
              setTaskToEdit(task);
              setShowModal(true);
            }}
          />
        </div>
      </section>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {modalMode === "create" ? "Criar Nova Tarefa" : "Editar Tarefa"}
        </h2>
        <TaskForm onSubmit={addTask} modalMode={modalMode} />
      </Modal>
    </section>
  );
};

export default Tasks;
