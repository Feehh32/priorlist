import PropTypes from "prop-types";
import { MdCalendarMonth } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";

const priorityGradient = {
  low: "from-white to-green-100",
  medium: "from-white to-yellow-100",
  high: "from-white to-red-100",
};

const priorityColor = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

const TaskList = ({ tasks, onEdit }) => {
  return tasks.length === 0 ? (
    <p className="flex items-center justify-center text-secondary font-semibold md:text-lg font-secondary text-center before:content-[''] before:w-1 before:h-10 before:md:h-6 before:bg-secondary/70 before:block before:mr-2">
      "Você ainda não tem tarefas. Clique em + Nova Tarefa para começar!"
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {tasks.map((task) => {
        const priority = task.priority.toLowerCase();
        return (
          <div
            key={task.id}
            className={` w-full p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r ${priorityGradient[priority]}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`text-xl font-secondary font-semibold ${priorityColor[priority]}`}
                >
                  {task.title}
                </h3>
                <p className="text-text-main mt-2">{task.description}</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="hidden peer" />
                <span className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500 text-secondary transition peer-checked:text-white">
                  ✓
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm text-secondary mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2">
                <MdCalendarMonth size={16} />
                <span>{task.deadline}</span>
              </div>
              <button
                type="button"
                className=" top-4 right-4 text-secondary hover:text-primary transition cursor-pointer"
                onClick={() => onEdit(task)}
              >
                <MdMoreVert size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
};

export default TaskList;
