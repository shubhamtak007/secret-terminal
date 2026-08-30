import { Router } from "express";
import { userDetails } from "./user.controller.js";
import tokenVerification from "../../middlewares/token.middleware.js";
import renewToken from "../../middlewares/renew-token.middleware.js";

const userRoutes = Router();

userRoutes.get("/me", tokenVerification, renewToken, userDetails);

export default userRoutes;