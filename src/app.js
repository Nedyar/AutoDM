/* DEPENDENCIES */
import path from "path";
import dotenv from "dotenv";
import express from "express";
import serveFavicon from "serve-favicon";

/* IMPORT ROUTE MANAGEMENT */
import appRouter from "./routes.js";

/* INITIALIZE .env */
//dotenv.config()
dotenv.config({ path: "./secrets/.env" });

/* INIT APP */
const app = express();

/* MANAGE REQUEST MAX SIZE */
app.use(express.json({ limit: "1500kb" }));
app.use(express.urlencoded({ extended: true }));

/* ADD FAVICON */
app.use(serveFavicon(path.join("./public", "favicon.ico")));

/* ROUTES MANAGER */
app.use("/", appRouter());

export default app;
