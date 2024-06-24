exports.getOverdueTasks = (tasks) => {
  return tasks.filter((task) => {
    const startDate = new Date(task.startDate);
    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate > dueDate && task.status !== "completed";
  });
};
