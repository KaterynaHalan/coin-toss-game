import express from "express";
import login from "./user/user-login.js";
import signup from "./user/user-signup.js";
import changePassword from "./user/user-change-password.js";
import auth from "../utils/auth.js";
import tossCreate from "./toss/toss-create.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signup);
router.post("/user/changePassword", auth, changePassword);

router.post("/toss/create", auth, tossCreate);

export default router;