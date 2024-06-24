const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const AppError = require("../util/appError");

const signToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60, // in seconds
    });
  } catch (err) {
    console.error("Error signing JWT:", err);
    throw new Error("Failed to sign JWT");
  }
};

const createSendToken = (user, statusCode, res) => {
  try {
    const token = signToken(user.id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "None";
    }

    res.cookie("jwt", token, cookieOptions);

    const { password, ...safeUser } = user;

    // Sending token and safe user data to client
    res.status(statusCode).json({
      status: "success",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Error creating/sending token:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;
  const role = "user";

  if (!username || !password) {
    return next(new AppError("Please enter username and password", 400));
  }

  try {
    const user = await User.query().findOne({ username });

    if (user) {
      return next(new AppError("Username already exists try new username "));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.query().insert({
      role,
      username,
      password: hashedPassword,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please enter username and password", 400));
  }

  try {
    const user = await User.query().findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect username or password", 401));
    }

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return next(new AppError("Invalid token. Please log in again.", 401));
      }
      return next(err);
    }

    const currentUser = await User.query().findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user?.role !== role) {
        return next(
          new AppError("You are not authorized to perform this action", 403)
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

exports.restrictToAdmin = restrictTo("admin");
exports.restrictToUser = restrictTo("user");
