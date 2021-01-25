import express from "express";
import {
  changePassword,
  editUser,
  userDetail,
  users,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get(routes.editProfile, editUser);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
