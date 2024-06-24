const User = require("../models/users");
const Task = require("../models/tasks");
const AppError = require("../util/appError");
const { getOverdueTasks } = require("../util/overdueTasks");

exports.getAllTaskStats = async (req, res, next) => {
  const tasks = await Task.query();
  const pending = tasks.filter((task) => task.status === "pending");
  const completed = tasks.filter((task) => task.status === "completed");

  const overdue = getOverdueTasks(tasks);

  const completedToday = tasks.filter((task) => {
    const startOfDay = new Date();
    const endOfDay = new Date();
    const updated = new Date(task.updatedAt);

    startOfDay.setHours(6, -30, 0, 0);
    endOfDay.setHours(30, -30, 0, 0);

    return startOfDay > updated < endOfDay && task.status === "completed";
  });

  const stats = {
    totalTasks: tasks.length,
    pendingTasks: pending.length,
    completedTasks: completed.length,
    overduedTasks: overdue.length,
    completedToday: completedToday.length,
  };

  res.status(200).json({
    status: "success",
    stats: stats,
  });
};

exports.getUserTasksStats = async (req, res, next) => {
  const { id } = req.params;

  const tasks = await Task.query().where("userId", id);
  const pending = tasks.filter((task) => task.status === "pending");
  const completed = tasks.filter((task) => task.status === "completed");

  const overdue = getOverdueTasks(tasks);

  const completedToday = tasks.filter((task) => {
    const startOfDay = new Date();
    const endOfDay = new Date();
    const updated = new Date(task.updatedAt);

    startOfDay.setHours(6, -30, 0, 0);
    endOfDay.setHours(30, -30, 0, 0);

    return startOfDay > updated < endOfDay && task.status === "completed";
  });

  const stats = {
    totalTasks: tasks.length,
    pendingTasks: pending.length,
    completedTasks: completed.length,
    overduedTasks: overdue.length,
    completedToday: completedToday.length,
  };

  res.status(200).json({
    status: "success",
    stats,
  });
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const dueDate = req.query.dueDate ? new Date(req.query.dueDate) : null;

    let query = Task.query()
      .select(
        "id",
        "task",
        "description",
        "startDate",
        "dueDate",
        "status",
        "userId"
      )
      .withGraphFetched("users")
      .modifyGraph("users", (builder) => {
        builder.select("id", "role", "username");
      });

    if (req.query.userId && req.query.userId !== "allUsers") {
      query = query.where("userId", req.query.userId);
    }

    if (req.query.status && req.query.status !== "allStatus") {
      query = query.where("status", req.query.status);
    }

    if (startDate) {
      query = query.where("startDate", ">", startDate);
    }

    if (dueDate) {
      query = query.where("dueDate", "<", dueDate);
    }

    const allTasks = await query;

    const overdueCheck = (tasks) => {
      return tasks.map((task) => {
        const dueDate = new Date(task.dueDate);
        const currentDate = new Date();
        dueDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate > dueDate && task.status !== "completed") {
          return { ...task, status: "overdue" };
        } else {
          return { ...task };
        }
      });
    };

    const checkedTasks = overdueCheck(allTasks);
    const forUpdate = checkedTasks.filter((task) => task.status === "overdue");

    if (forUpdate.length > 0) {
      const taskIdsToUpdate = forUpdate.map((task) => task.id);
      await Task.query()
        .patch({ status: "overdue" })
        .whereIn("id", taskIdsToUpdate);
    }

    const tasks = checkedTasks.slice(offset, offset + limit);

    res.status(200).json({
      status: "success",
      length: allTasks.length,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserTasksByUserId = async (req, res, next) => {
  const { id } = req.params;

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
  const dueDate = req.query.dueDate ? new Date(req.query.dueDate) : null;

  try {
    let query = Task.query().where("userId", id);

    if (req.query.status) {
      if (req.query.status !== "allStatus") {
        query = query.where("status", req.query.status);
      }
    }

    if (startDate) {
      query = query.where("startDate", ">", startDate);
    }

    if (dueDate) {
      query = query.where("dueDate", "<", dueDate);
    }

    const allTasks = await query;

    const overdueCheck = (tasks) => {
      return tasks.map((task) => {
        const dueDate = new Date(task.dueDate);
        const currentDate = new Date();
        dueDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate > dueDate && task.status !== "completed") {
          return { ...task, status: "overdue" };
        } else {
          return { ...task };
        }
      });
    };

    const checkedTasks = overdueCheck(allTasks);
    const forUpdate = checkedTasks.filter((task) => task.status === "overdue");

    if (forUpdate.length > 0) {
      const taskIdsToUpdate = forUpdate.map((task) => task.id);
      await Task.query()
        .patch({ status: "overdue" })
        .whereIn("id", taskIdsToUpdate);
    }

    const tasks = checkedTasks.slice(offset, offset + limit);

    res.status(200).json({
      status: "success",
      length: allTasks.length,
      tasks: tasks,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.query()
      .select(
        "id",
        "task",
        "description",
        "startDate",
        "dueDate",
        "status",
        "userId"
      )
      .findById(id)
      .withGraphFetched("users")
      .modifyGraph("users", (builder) => {
        builder.select("id", "role", "username");
      });

    if (task) {
      res.status(200).json({
        status: "success",
        task,
      });
    } else {
      return next(new AppError(`Task with ID: ${id} not found`, 404));
    }
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { task, description, startDate, dueDate, userId } = req.body;

    if (!task || !userId || !description || !startDate || !dueDate) {
      return next(new AppError("Please enter all fields", 400));
    }

    const parsedStartDate = new Date(startDate);
    const parsedDueDate = new Date(dueDate);
    const currentDate = new Date();

    parsedStartDate.setHours(0, 0, 0, 0);
    parsedDueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedDueDate.getTime())) {
      return next(new AppError("Invalid date format", 400));
    }

    if (parsedStartDate < currentDate) {
      return next(new AppError("Start date should not be before today", 400));
    }

    if (parsedDueDate < parsedStartDate) {
      return next(
        new AppError("Due date should not be before start date", 400)
      );
    }

    const user = await User.query().findById(userId);

    if (!user) {
      return next(
        new AppError("User with this ID is not available to assign task", 404)
      );
    }

    const newTask = await Task.query().insert({
      task,
      userId,
      description,
      startDate: parsedStartDate,
      dueDate: parsedDueDate,
      status: "pending",
    });

    res.status(201).json({
      status: "success",
      task: newTask,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, description, startDate, dueDate, userId, status } = req.body;
    if (!task || !userId || !description || !startDate || !dueDate || !status) {
      return next(new AppError("Please enter all fields", 400));
    }

    const parsedStartDate = new Date(startDate);
    const parsedDueDate = new Date(dueDate);
    const currentDate = new Date();

    parsedStartDate.setHours(0, 0, 0, 0);
    parsedDueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedDueDate.getTime())) {
      return next(new AppError("Invalid date format", 400));
    }

    if (parsedDueDate < parsedStartDate) {
      return next(
        new AppError("Due date should not be before start date", 400)
      );
    }

    const existingTask = await Task.query().findById(id);

    if (!existingTask) {
      return next(new AppError("Task with this ID not found.", 404));
    }

    const user = await User.query().findById(userId);

    if (!user) {
      return next(new AppError("User with this ID is not found", 404));
    }

    const updateData = {
      id: id,
      task,
      description,
      startDate: parsedStartDate,
      dueDate: parsedDueDate,
      userId,
      status,
      updatedAt: new Date(),
    };

    const updatedTask = await Task.query()
      .patchAndFetchById(id, updateData)
      .withGraphFetched("users");

    res.status(200).json({
      status: "success",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return next(new AppError("Task ID is required.", 400));
    }

    const currentTask = await Task.query().findById(taskId);

    if (!currentTask) {
      return next(new AppError("Task with this ID not found.", 404));
    }

    await Task.query().deleteById(taskId);

    res.status(204).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
