import express from "express";

// PUBLIC ROUTES
import Routes from "./routes";

export default () => {
	const router = express.Router();

	/* MANAGE ROUTES */
	router.use("/", Routes());

	return router;
};
