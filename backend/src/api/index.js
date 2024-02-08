import express from "express";
import login from "./user/user-login.js";
import signup from "./user/user-signup.js";
import changePassword from "./user/user-change-password.js";
import auth from "../utils/auth.js";
import getTokens from "./tokens/get-tokens.js";
import setTokens from "./tokens/set-tokens.js";

const router = express.Router();

router.post("/user/login", login, getTokens);
router.post("/user/signup", signup, setTokens);
router.post("/user/changePassword", auth, changePassword);

export default router;