import PropTypes from "prop-types";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import TaskActions from "./TaskActions";
import useApiRequest from "../../hooks/useApiRequest";
import { useState, useEffect } from "react";

const priorityGradient = {
  low: "from-white to-green-100",
  medium: "from-white to-yellow-100",
  high: "from-white to-red-100",
};

const priorityColor = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

const TaskList = ({ tasks, onEdit, onDelete, onClearCompleted }) => {
  const { request } = useApiRequest();
  const [stateTasks, setStateTasks] = useState(tasks);

  // Update state when tasks change
  useEffect(() => setStateTasks(tasks), [tasks]);

  // Mark as completed (only style change)
  const handleComplete = async (taskId) => {
    const task = stateTasks.find((task) => task.id === taskId);

    const response = await request(`tasks/${taskId}`, "PATCH", {
      completed: !task.completed,
      updatedAt: new Date().toISOString(),
    });

    if (response && !response.error) {
      setStateTasks((prev) =>
        prev.map((task) => (task.id === response.id ? response : task))
      );
    }
  };

  // Initiate removal animation
  const handleRemove = (taskId) => {
    setStateTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, removing: true } : task
      )
    );
  };

  // Delete all tasks in completed tasks
  const mainTasks = stateTasks.filter((task) => !task.archived);
  const completedTasks = stateTasks.filter((task) => task.archived);

  // End removal animation
  const handleTransitionEnd = async (taskId) => {
    setStateTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, removing: false } : task
      )
    );

    const response = await request(`tasks/${taskId}`, "PATCH", {
      archived: true,
    });

    if (response && !response.error) {
      setStateTasks((prev) =>
        prev.map((task) => (task.id === response.id ? response : task))
      );
    }
  };

  return mainTasks.length === 0 && completedTasks.length === 0 ? (
    <p className="flex items-center justify-center text-secondary font-semibold md:text-lg font-secondary text-center before:content-[''] before:w-1 before:h-10 before:md:h-6">
      Você ainda não tem tarefas. Clique em + Nova Tarefa para começar!
    </p>
  ) : (
    <div className="grid md:gap-6 gap-2 max-w-4xl">
      {mainTasks.map((task) => {
        const priority = task.priority.toLowerCase();
        return (
          <div
            key={task.id}
            className={` w-full p-4 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r ${
              task.completed ? "bg-gray-300" : priorityGradient[priority]
            } transition-all duration-500 ease-in-out
            ${
              task.removing
                ? "opacity-0 -translate-x-full"
                : "opacity-100 translate-x-0"
            }`}
            onTransitionEnd={() =>
              task.removing && handleTransitionEnd(task.id)
            }
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={` text-lg md:text-xl font-secondary font-semibold ${
                    task.completed
                      ? "line-through text-secondary"
                      : priorityColor[priority]
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-text-main mt-2">{task.description}</p>
              </div>
              <div className="flex items-center gap-4 md:flex-row flex-col">
                <button
                  className={`${
                    task.completed ? "bg-green-500" : "bg-primary"
                  }  text-white text-sm rounded-md md:px-2 px-4 py-1 ${
                    task.completed ? "" : "hover:bg-blue-500"
                  } transition-colors duration-300 cursor-pointer flex items-center gap-2 shadow-md`}
                  onClick={() => handleComplete(task.id)}
                >
                  <MdOutlineCheck size={20} color="white" />
                  <span className="md:block hidden">
                    {task.completed ? "Concluído" : "Concluir"}
                  </span>
                </button>
                <button
                  className={`${
                    task.completed
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-500"
                  } text-white text-sm rounded-md md:px-2 px-4 py-1  transition-colors duration-300 cursor-pointer flex items-center gap-2 shadow-md`}
                  onClick={() => handleRemove(task.id)}
                  disabled={!task.completed}
                >
                  <MdDeleteForever size={20} color="white" />
                  <span className="md:block hidden">Remover</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm text-secondary mt-4 border-t border-gray-200 pt-4 ">
              <div className="flex items-center gap-2">
                <MdCalendarMonth size={16} />
                <span>
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString("pt-BR")
                    : "-"}
                </span>
                <p className="font-secondary text-xs self-end">
                  - prazo limite
                </p>
              </div>
              <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>
        );
      })}

      {/*list of completed tasks  */}
      {completedTasks.length > 0 && (
        <>
          <h4 className="text-primary font-semibold md:text-2xl font-secondary text-center mt-8">
            Tarefas Concluídas
          </h4>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className=" w-full p-4 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r bg-gray-300 transition-all duration-500 ease-in-out"
            >
              <div className="md:flex justify-between items-center">
                <h3 className=" text-lg md:text-xl font-secondary font-semibold text-secondary">
                  {task.title}
                </h3>
                {task.updatedAt && (
                  <span className="text-sm text-secondary">
                    {`Finalizado em ${new Date(
                      task.updatedAt
                    ).toLocaleDateString("pt-BR")}`}
                  </span>
                )}
              </div>
            </div>
          ))}
          <button
            className="text-sm text-secondary mt-4 hover:text-primary cursor-pointer transition-colors duration-300"
            onClick={() => onClearCompleted(completedTasks)}
          >
            Deletar todas as tarefas concluídas
          </button>
        </>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default TaskList;
