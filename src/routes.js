import express from "express";

// PROCEDURES
import play from "./procedures/play.js";

const pageGame = "play";

export default () => {
	const router = express.Router();

	router.route(`/${pageGame}`).get((req, res, next) => {
		play([{ name: "Juan", class: "Paladin", raze: "Human", lvl: "3" }])
			.then((response) => {
				if (response["success"]) {
					return res.json(response.response);
				} else {
					console.error("PROCEDURE DID NOT SUCCESS: " + pageGame);
					return next();
				}
			})
			.catch((error) => {
				console.error("ROUTE ERROR: " + pageGame);
				return next();
			});
	});

	return router;
};
