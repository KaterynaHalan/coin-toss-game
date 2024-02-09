import express from "express";
import login from "./user/user-login.js";
import signup from "./user/user-signup.js";
import changePassword from "./user/user-change-password.js";
import auth from "../utils/auth.js";
import tossCreate from "./toss/toss-create.js";
import tossHistory from "./toss/toss-history.js";
import tokensBuy from "./tokens/tokens-buy.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signup);
router.post("/user/changePassword", auth, changePassword);

router.post("/toss/create", auth, tossCreate);
router.get("/toss/history", auth, tossHistory);

/** For a user to be able to "buy" tokens when run out of them */
router.post("/tokens/buy", auth, tokensBuy);

export default router;