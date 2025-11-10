import { useMemo, useCallback, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

import TaskForm from "../components/taskForm/TaskForm";
import TaskList from "../components/tasks/TaskList";
import Modal from "../components/modal/Modal";
import ToastMsg from "../components/notifications/ToastMsg";
import TaskSortMenu from "../components/tasks/TaskSortMenu";
import PageTransition from "../components/pageTransition/PageTransition";
import ConfirmModal from "../components/modal/ConfirmModal";
import useTasks from "../hooks/useTasks";
import GenericError from "../components/UI/GenericError";
import { AnimatePresence } from "framer-motion";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
    clearArchivedTasks,
    loading,
    tasks,
    error,
  } = useTasks();

  const modalTitleId = "task-modal-title";

  // dinamic title
  useEffect(() => {
    document.title = "PriorList | Suas tarefas";
  }, []);

  // Fetch tasks
  useEffect(() => {
    const handleFetchTasks = async () => {
      const option = localStorage.getItem("sortOption");
      await fetchTasks(option);
    };

    handleFetchTasks();
  }, []);

  // Function to add a new toast message
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Function to add a new task
  const addTask = async (newTask) => {
    try {
      const response = await createTask(
        newTask,
        localStorage.getItem("sortOption")
      );

      if (!response) {
        addToast("Erro ao criar tarefa.", "error");
        return;
      }

      addToast("Tarefa criada com sucesso!", "success");
    } catch {
      addToast("Erro inesperado ao criar tarefa.", "error");
    } finally {
      setShowModal(false);
    }
  };

  // Function to update a task and update the list
  const handleUpdateTask = async (taskToUpdate) => {
    try {
      const response = await updateTask(
        taskToUpdate,
        localStorage.getItem("sortOption")
      );

      if (!response) {
        addToast("Erro ao atualizar tarefa.", "error");
        return;
      }

      addToast("Tarefa atualizada com sucesso!", "success");
    } catch {
      addToast("Erro inesperado ao atualizar tarefa.", "error");
    } finally {
      setShowModal(false);
    }
  };

  // Function to handle the status update (completed/archived) of Tasklist
  const handleStatusUpdate = async (taskToUpdate) => {
    try {
      await updateTask(taskToUpdate);
    } catch {
      if (Object.keys(taskToUpdate).includes("completed")) {
        addToast(
          "Erro inesperado ao tentar marcar a tarefa como completa.",
          "error"
        );
      } else {
        addToast("Erro inesperado ao arquivar a tarefa.", "error");
      }
    }
  };

  // All 3 functions below are used to delete a task and update the list
  const handleDeleteRequest = useCallback((taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteTask = useCallback(
    async (task, showToast = true) => {
      try {
        const response = await deleteTask(task.id);
        if (!response) {
          if (showToast) addToast("Error ao deletar a tarefa", "error");
          return;
        }

        if (showToast) addToast("Tarefa deletada com sucesso!", "success");
      } catch {
        if (showToast) {
          addToast("Erro inesperado ao deletar a tarefa.", "error");
        }
      }
    },
    [deleteTask]
  );

  const handleDeleteConfirm = useCallback(
    async (confirmed) => {
      if (confirmed && taskToDelete) {
        await handleDeleteTask(taskToDelete);
      }
      setShowDeleteModal(false);
      setTaskToDelete(null);
    },
    [handleDeleteTask, taskToDelete]
  );

  // Function to delete all tasks marked as completed
  const handleClearArchivedTasks = async (completedTasks) => {
    try {
      const response = await clearArchivedTasks(completedTasks);
      if (!response) {
        addToast("Erro ao deletar tarefas concluídas.", "error");
        return;
      }
      addToast("Todas as tarefas concluídas foram deletadas!", "success");
    } catch {
      addToast("Erro inesperado ao deletar tarefas concluídas.", "error");
    }
  };

  // Function to remove the toast message
  const handleToastClose = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Function to handle the value of search input
  const handleChangeSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Function to normalize strings and make the search insensitive
  const normalizeString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Filter tasks by title when user search something
  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          normalizeString(task.title).includes(normalizeString(searchTerm)) &&
          task.archived === false
      ),
    [tasks, searchTerm]
  );

  // Function to handle task sorting options
  const handleSortChange = useCallback(
    async (option) => {
      await fetchTasks(option);
    },
    [fetchTasks]
  );

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
          <div
            className="md:bg-white rounded-2xl md:p-12 md:shadow-md mt-2 md:max-w-4xl w-full"
            aria-live="polite"
          >
            {filteredTasks?.length === 0 && searchTerm ? (
              <p className="flex items-center justify-center text-secondary font-semibold md:text-lg font-secondary text-center">
                Nenhuma tarefa encontrada com o termo "{searchTerm}"
              </p>
            ) : (
              <TaskList
                tasks={searchTerm ? filteredTasks : tasks}
                onDeleteRequest={handleDeleteRequest}
                onClearCompleted={handleClearArchivedTasks}
                setShowDeleteModal={setShowDeleteModal}
                onEdit={(task) => {
                  setModalMode("edit");
                  setTaskToEdit(task);
                  setShowModal(true);
                }}
                loading={loading}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
          </div>
        </section>
        <div
          className="fixed bottom-6 w-full md:w-auto left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50"
          aria-live="polite"
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <ToastMsg
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={() => handleToastClose(toast.id)}
              />
            ))}
          </AnimatePresence>
        </div>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          titleId={modalTitleId}
        >
          <h2
            className="text-xl font-semibold mb-4 text-primary"
            id={modalTitleId}
          >
            {modalMode === "create" ? "Criar Nova Tarefa" : "Editar Tarefa"}
          </h2>
          <TaskForm
            onSubmit={modalMode === "create" ? addTask : handleUpdateTask}
            modalMode={modalMode}
            taskToEdit={taskToEdit}
            loading={loading}
          />
        </Modal>
        <ConfirmModal
          isOpen={showDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="Tem certeza que deseja excluir essa tarefa?"
          message="Esta ação não poderá ser desfeita."
        />
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnimatePresence>
            {error && <GenericError error={error} key="global-error-banner" />}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
};

export default Tasks;
