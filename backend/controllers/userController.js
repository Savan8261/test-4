const User = require("../models/users");
const AppError = require("../util/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    let query = await User.query()
      .select("id", "role", "username")
      .where("role", "!=", "admin");

    if (req.query.username) {
      query = query.filter((user) => user.username === req.query.username);
    }

    const users = query;

    if (users.length > 0) {
      res.status(200).json({
        status: "success",
        users,
      });
    } else {
      res.status(200).json({
        status: "success",
        users: [],
        message: "No users avalible",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    let query;
    query = User.query()
      .findById(id)
      .select("id", "role", "username")
      .withGraphFetched("tasks")
      .modifyGraph("tasks", (builder) => {
        builder.select(
          "id",
          "task",
          "description",
          "startDate",
          "dueDate",
          "status",
          "userId"
        );
      });

    if (req.query.status) {
      if (req.query.status !== "allStatus") {
        query = query
          .withGraphFetched("tasks")
          .where("status", req.query.status);
      } else {
      }
    }

    const user = await query;

    if (user) {
      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      return next(new AppError(`User with ID: ${id} not found`, 404));
    }
  } catch (err) {
    next(err);
  }
};
