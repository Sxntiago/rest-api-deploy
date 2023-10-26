import {
  createTask,
  deleteTask,
  getAll,
  getById,
  updateTask,
} from "../models/task.js";
import createHttpError from "http-errors";

export const getAllController = async (req, res, next) => {
  try {
    const { category } = req.query;
    const tasks = await getAll({ category });
    return res.json(tasks);
  } catch (error) {
    next(createHttpError(500));
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getById({ id });
    if (task) return res.json(task);
    res.status(404).json({ error: "Error with get method" });
  } catch (error) {
    next(createHttpError(500));
  }
};

export const createTaskController = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (typeof title !== "string") {
      return res.status(400).json({ message: "Title must be a string" });
    }
    if (typeof description !== "string") {
      return res.status(400).json({ message: "Description must be a string" });
    }
    if (typeof category !== "string") {
      return res.status(400).json({ message: "Category must be a string" });
    }
    const newTask = await createTask({ title, description, category });
    return res.status(201).json(newTask);
  } catch (error) {
    next(createHttpError(500));
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedTask = await updateTask({ id, data: newData });
    if (updatedTask === false) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(updatedTask);
  } catch (error) {
    next(createHttpError(500));
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskIndex = await deleteTask({ id });
    if (taskIndex === false) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json();
  } catch (error) {
    next(createHttpError(500));
  }
};
