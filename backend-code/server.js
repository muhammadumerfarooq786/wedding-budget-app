import express from "express";
import dotenv from "dotenv";
import Connect_DB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import { notFound, error } from "./middleware/errorMiddleware.js";
import path from "path";

import "colors";
dotenv.config();
Connect_DB();

const app = express();
app.use(express.json());

const __dirname = path.resolve();
app.use("/public/posts", express.static(__dirname + "/public"));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  console.log("App is running");

  res.send(`API is running...`);
});

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
