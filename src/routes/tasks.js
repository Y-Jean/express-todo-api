import express from "express";
const router = express.Router();
import * as taskController from "../controllers/taskController.js";

router.get("/", taskController.getTaskList);
router.get("/", taskController.getTask);

export default router;
