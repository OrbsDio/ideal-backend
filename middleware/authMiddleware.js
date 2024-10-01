import ErrorHandler from "../utils/utility.js";
import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Please Login", 401));
    }

    // Verify the token
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    // Store user details in the request object
    req.userId = verify._id;
    req.username = verify.username;

    next(); // Move to the next middleware
  } catch (error) {
    return next(new ErrorHandler("Authentication failed", 401));
  }
};


export {authMiddleware}