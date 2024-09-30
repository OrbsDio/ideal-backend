import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "orbsDio" })
    .then((data) => {
      console.log(`Connected to DB: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  return res.status(code).json({
    success: true,
    message,
    user,
    token,
  });
};

export { connectDb, sendToken };
