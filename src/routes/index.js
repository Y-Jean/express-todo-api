import express from "express";

import authRouter from "./auth.js";
import tasksRouter from "./tasks.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);

export default router;
