import User from "../models/user-model.js";
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";
import bcrypt from "bcryptjs";

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      if (userExists) {
        return next(new ErrorHandler("User already exists", 500));
      }

    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
      return next(new ErrorHandler("Invlaid Login", 400));
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) return next(new ErrorHandler("Invlaid Login", 400));

    sendToken(res, userExists, 200, `Welcome Back ${userExists.name}`);
  } catch (error) {
    next(error);
  }
};

export { register, login };
