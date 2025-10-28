import PropTypes from "prop-types";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import TaskActions from "./TaskActions";

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const priorityGradient = {
  3: "from-white to-green-100",
  2: "from-white to-yellow-100",
  1: "from-white to-red-100",
};

const priorityColor = {
  3: "text-green-500",
  2: "text-yellow-500",
  1: "text-red-500",
};

// Used for screen readers
const VisuallyHidden = ({ children }) => (
  <span className="sr-only">{children}</span>
);

//Animation cards variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 100, scale: 0.95, transition: { duration: 0.3 } },
};

// Hover/tap animation from button
const buttonHoverTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const TaskList = ({
  tasks,
  onEdit,
  onClearCompleted,
  onDeleteRequest,
  onStatusUpdate,
  loading,
}) => {
  // Mark as completed (only style change)
  const handleComplete = async (task) => {
    onStatusUpdate({
      id: task.id,
      completed: !task.completed,
      updated_at: new Date().toISOString(),
    });
  };

  // Initiate removal animation
  const handleRemove = async (task) => {
    onStatusUpdate({
      id: task.id,
      archived: true,
      updated_at: new Date().toISOString(),
    });
  };

  // Delete all tasks in completed tasks
  const mainTasks = tasks.filter((task) => !task.archived);
  const completedTasks = tasks.filter((task) => task.archived);

  return mainTasks.length === 0 && completedTasks.length === 0 && !loading ? (
    <p className="flex items-center justify-center text-secondary font-semibold md:text-lg font-secondary text-center before:content-[''] before:w-1 before:h-10 before:md:h-6">
      Você ainda não tem tarefas. Clique em + Nova Tarefa para começar!
    </p>
  ) : (
    <ul className="grid md:gap-6 gap-2 max-w-4xl">
      <AnimatePresence>
        {mainTasks.map((task) => {
          return (
            <motion.li
              key={task.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`relative w-full p-4 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r ${
                task.completed ? "bg-gray-300" : priorityGradient[task.priority]
              }`}
            >
              <div className="flex gap-4 justify-between items-start">
                <div>
                  <h3
                    className={` text-lg md:text-xl font-secondary font-semibold ${
                      task.completed
                        ? "line-through text-secondary"
                        : priorityColor[task.priority]
                    }`}
                    aria-label={`Tarefa: ${task.title} ${
                      task.completed ? "Concluida" : ""
                    } - Prioridade ${task.priority}`}
                  >
                    {task.title}
                  </h3>
                  <VisuallyHidden>
                    {task.completed ? " - Concluída" : ""}
                    {` - Prioridade ${task.priority}`}
                  </VisuallyHidden>
                  <p className="text-text-main mt-2">{task.description}</p>
                </div>
                <div className="flex items-center gap-4 md:flex-row flex-col">
                  <motion.button
                    {...buttonHoverTap}
                    className={`${
                      task.completed ? "bg-green-500" : "bg-primary"
                    }  text-white   ${
                      task.completed ? "" : "hover:bg-blue-500"
                    } cursor-pointer flex items-center gap-2 shadow-md md:px-2 px-4 py-1 text-sm rounded-md`}
                    onClick={() => handleComplete(task)}
                  >
                    <MdOutlineCheck
                      size={20}
                      color="white"
                      aria-hidden="true"
                    />
                    <span className="md:block hidden">
                      {task.completed ? "Concluído" : "Concluir"}
                    </span>
                  </motion.button>
                  <motion.button
                    {...buttonHoverTap}
                    className={`${
                      task.completed
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-500"
                    } text-white text-sm rounded-md md:px-2 px-4 py-1 cursor-pointer flex items-center gap-2 shadow-md`}
                    onClick={() => handleRemove(task)}
                    disabled={!task.completed}
                    aria-label={
                      task.completed
                        ? `Arquivar a tarefa: ${task.title}`
                        : `Conclua a tarefa para habilitar o arquivamento`
                    }
                  >
                    <MdDeleteForever
                      size={20}
                      color="white"
                      aria-hidden="true"
                    />
                    <span className="md:block hidden">Remover</span>
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm text-secondary mt-4 border-t border-gray-200 pt-4 ">
                <div className="flex items-center gap-2">
                  <MdCalendarMonth size={16} aria-hidden="true" />
                  <span aria-live="polite">
                    {task.deadline
                      ? new Date(
                          task.deadline + "T00:00:00"
                        ).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                      : "sem prazo limite"}
                  </span>
                  <p className="font-secondary text-xs self-end">
                    {task.deadline && " - prazo limite"}
                  </p>
                </div>
                <TaskActions
                  task={task}
                  onEdit={onEdit}
                  onDeleteRequest={onDeleteRequest}
                />
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>

      {/*list of archived tasks  */}
      {completedTasks.length > 0 && (
        <div className="w-full grid grid-cols-1 justify-center">
          <h4 className="text-primary font-semibold md:text-2xl font-secondary text-center mt-8 mb-4">
            Tarefas Arquivadas
          </h4>
          <ul className="grid md:gap-6 gap-2">
            <AnimatePresence>
              {completedTasks.map((task) => (
                <motion.li
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  key={task.id}
                  className=" w-full p-4 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r bg-gray-300"
                >
                  <div className="md:flex gap-4 justify-between items-center">
                    <h3 className=" text-lg md:text-xl font-secondary font-semibold text-secondary">
                      {task.title}
                    </h3>
                    {task.updated_at && (
                      <span className="text-sm text-secondary min-w-3xs text-right">
                        {`Finalizado em ${new Date(
                          task.updated_at
                        ).toLocaleDateString("pt-BR")}`}
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <motion.button
            {...buttonHoverTap}
            className="text-sm text-secondary mt-4 hover:text-primary cursor-pointer max-w-fit m-auto"
            onClick={() => onClearCompleted(completedTasks)}
          >
            Deletar todas as tarefas arquivadas
          </motion.button>
        </div>
      )}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default TaskList;
