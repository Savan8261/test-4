const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protected routes
router.use(authController.protect);

// Update task
router.patch("/:id", taskController.updateTaskById);

//get all tasks assigned to perticular user
router.get("/userTasks/:id", taskController.getUserTasksByUserId);

//get all stats of user
router.get("/userTasksStats/:id", taskController.getUserTasksStats);

//protected and restricted to adminn routes

router.use(authController.restrictToAdmin);

//get all taskStats
router.get("/stats", taskController.getAllTaskStats);

//delete task by id
router.delete("/:id", taskController.deleteTaskById);

// get task by id
router.get("/:id", taskController.getTaskById);

// Create task
router.post("/", taskController.createTask);

//get all tasks
router.get("/", taskController.getAllTasks);

module.exports = router;
