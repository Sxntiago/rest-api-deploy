import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllController,
  getByIdController,
  updateTaskController,
} from "../controllers/tasks.js";

export const tasksRouter = Router();

tasksRouter.get("/", getAllController);

tasksRouter.get("/:id", getByIdController);

tasksRouter.post("/", createTaskController);

tasksRouter.patch("/:id", updateTaskController);

tasksRouter.delete("/:id", deleteTaskController);
