const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected routes
router.use(authController.protect);

//get user by usrename
router.get("/:id", userController.getUserById);

//protected and restricted to damin
router.get("/", authController.restrictToAdmin, userController.getAllUsers);

module.exports = router;
