import { useEffect, useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import TaskForm from "../components/taskForm/TaskForm";
import TaskList from "../components/tasks/TaskList";
import Modal from "../components/modal/Modal";
import Spinner from "../components/UI/spinner";
import ToastMsg from "../components/notifications/ToastMsg";
import useApiRequest from "../hooks/useApiRequest";
import handleApiError from "../utils/taskApiErrors";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import TaskSortMenu from "../components/tasks/TaskSortMenu";
import PageTransition from "../components/pageTransition/PageTransition";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { request, loading } = useApiRequest();
  const { user } = useContext(AuthContext);
  const originalTaskRef = useRef([]);

  // dinamic title
  useEffect(() => {
    document.title = "PriorList | Suas tarefas";
  }, []);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await request(`tasks?userId=${user.id}`, "GET");
      if (response && !response.error) {
        originalTaskRef.current = response;

        setTasks(response);
        const saverdOrder = localStorage.getItem("sortOption") || "default";
        handleSortChange(saverdOrder, response);
      }
    };

    fetchTasks();
  }, [request, user.id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  // Function to add a new toast message
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Function to add a new task and update the list
  const addTask = async (newTask) => {
    const response = await request("tasks", "POST", newTask);

    handleApiError(response.error, addToast);
    if (response && !response.error) {
      addToast("Tarefa criada com sucesso!", "success");
      setTasks((prev) => [...prev, response]);
      originalTaskRef.current = [...originalTaskRef.current, response];
      setShowModal(false);
    }
    setShowModal(false);
    return false;
  };

  // Function to update a task and update the list
  const updateTask = async (updatedTask) => {
    const response = await request(
      `tasks/${updatedTask.id}`,
      "PATCH",
      updatedTask
    );

    handleApiError(response.error, addToast);
    if (response && !response.error) {
      addToast("Tarefa atualizada com sucesso!", "update");
      setTasks((prev) =>
        prev.map((task) => (task.id === response.id ? response : task))
      );

      originalTaskRef.current = originalTaskRef.current.map((task) =>
        task.id === response.id ? response : task
      );
      setShowModal(false);
      return true;
    }
    setShowModal(false);
    return false;
  };

  // Function to delete a task and update the list
  const deleteTask = async (taskId, showToast = true) => {
    const response = await request(`tasks/${taskId}`, "DELETE");

    handleApiError(response.error, addToast);
    if (response && !response.error) {
      if (showToast) addToast("Tarefa deletada com sucesso!", "success");
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      originalTaskRef.current = originalTaskRef.current.filter(
        (task) => task.id !== taskId
      );
    }

    return response;
  };

  // Function to delete all tasks marked as completed
  const clearCompleted = async (completedTasks) => {
    const responses = await Promise.all(
      completedTasks.map((task) => deleteTask(task.id, false))
    );

    const anyError = responses.some((res) => res?.error);

    if (!anyError) {
      addToast("Todas as tarefas concluídas foram deletadas!", "success");
    }
  };

  // Function to remove the toast message
  const handleToastClose = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Function to handle the value of search input
  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to normalize strings and make the search insensitive
  const normalizeString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Filter tasks by title when user search something
  const filteredTasks = tasks.filter((task) =>
    normalizeString(task.title).includes(normalizeString(searchTerm))
  );

  // Function to handle task sorting options
  const handleSortChange = (newSort, baseTasks = tasks) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    switch (newSort) {
      case "urgents":
      case "priority":
        setTasks(
          [...baseTasks].sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
          )
        );
        break;
      case "recents":
        setTasks(
          [...baseTasks].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      case "a-z":
        setTasks([...baseTasks].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      default:
        setTasks(originalTaskRef.current);
    }
  };

  return (
    <PageTransition>
      <section className="relative min-h-screen px-4 md:px-16 py-8 md:py-16">
        <h1 className="text-2xl md:text-6xl text-primary font-secondary font-semibold text-center">
          Suas Tarefas
        </h1>
        <section className="flex flex-col items-center mt-8 md:mt-16 gap-4 w-full">
          <div className="w-full max-w-4xl flex justify-between flex-col md:flex-row">
            <div className="relative md:mb-0 mb-4">
              <MdSearch
                className="absolute md:right-4 top-1/2 md:top-1/3 transform -translate-y-1/2 right-4 text-primary opacity-70"
                size={20}
              />
              <input
                onChange={handleChangeSearch}
                type="search"
                aria-label="Buscar tarefas"
                placeholder="Digite para pesquisar..."
                className="search-input w-full md:min-w-md border border-input-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <TaskSortMenu handleSortOptions={handleSortChange} />
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition cursor-pointer md:self-start"
              onClick={() => {
                setShowModal(true);
                setModalMode("create");
                setTaskToEdit(null);
              }}
            >
              + Nova Tarefa
            </button>
          </div>
          <div className="md:bg-white rounded-2xl md:p-12 md:shadow-md mt-2 md:max-w-4xl w-full ">
            {filteredTasks?.length === 0 && searchTerm ? (
              <p className="flex items-center justify-center text-secondary font-semibold md:text-lg font-secondary text-center">
                Nenhuma tarefa encontrada com o termo "{searchTerm}"
              </p>
            ) : (
              <TaskList
                tasks={searchTerm ? filteredTasks : tasks}
                onDelete={deleteTask}
                onClearCompleted={clearCompleted}
                onEdit={(task) => {
                  setModalMode("edit");
                  setTaskToEdit(task);
                  setShowModal(true);
                }}
              />
            )}
          </div>
        </section>
        <div className="fixed bottom-6 w-full md:w-auto left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
          {toasts.map((toast) => (
            <ToastMsg
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => handleToastClose(toast.id)}
            />
          ))}
        </div>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-semibold mb-4 text-primary">
            {modalMode === "create" ? "Criar Nova Tarefa" : "Editar Tarefa"}
          </h2>
          <TaskForm
            onSubmit={modalMode === "create" ? addTask : updateTask}
            modalMode={modalMode}
            taskToEdit={taskToEdit}
          />
        </Modal>
      </section>
    </PageTransition>
  );
};

export default Tasks;
