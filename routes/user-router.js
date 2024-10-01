import express from "express";
import {
  getMyProfile,
  login,
  register,
} from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

router.use(authMiddleware);
router.route("/myprofile").get(getMyProfile);

export default router;
