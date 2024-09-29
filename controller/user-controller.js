import User from "../models/user-model.js";
import ErrorHandler from "../utils/utility.js"


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

export { register };
