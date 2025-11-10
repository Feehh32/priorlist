// Use switch to sort tasks locally
const sortTasks = (tasks, sortOption = "default") => {
  const sort = [...tasks];

  switch (sortOption) {
    case "urgents":
      return sort.sort((a, b) => a.priority - b.priority);
    case "a-z":
      return sort.sort((a, b) => a.title.localeCompare(b.title));
    case "deadline":
      return sort.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    case "default":
    default:
      return sort.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
  }
};

export default sortTasks;
