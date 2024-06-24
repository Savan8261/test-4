const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./util/appError");

// Import routers
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");

//middlewares
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Normal middleware for dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mounting routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//If URL not found
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
