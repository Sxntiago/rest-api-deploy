import express, { json } from "express";
import { tasksRouter } from "./routes/tasks.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.disable("x-powered-by");

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  methods: "GET,POST,DELETE,PATCH",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Server on, please go to /tasks" });
});

app.use("/tasks", tasksRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log("Server running on PORT 8080");
});
