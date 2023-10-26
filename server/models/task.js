import { createRequire } from "node:module";
import crypto from "node:crypto";
const require = createRequire(import.meta.url);

const tasks = require("../tasks.json");

export const getAll = async ({ category }) => {
  if (category) {
    const filteredTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.toLowerCase()
    );
    return filteredTasks;
  }
  return tasks;
};

export const getById = async ({ id }) => {
  const task = tasks.find((task) => task.id === id);
  return task;
};

export const createTask = async ({ title, description, category }) => {
  const newId = crypto.randomUUID();
  const newTask = {
    id: newId,
    title,
    description,
    category,
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = async ({ id, data }) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return false;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...data,
  };
  return tasks[taskIndex];
};

export const deleteTask = async ({ id }) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return false;

  tasks.splice(taskIndex, 1);
  return true;
};
