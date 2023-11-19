import express from "express";

// PROCEDURES
import play from "./procedures/play.js";
import keepPlaying from "./procedures/continue.js";

const pageStartGame = "play";
const pageGame = "continue";

export default () => {
	const router = express.Router();

	router.route(`/${pageStartGame}`).get((req, res, next) => {
		play([{ name: "Tenorio", class: "Mage", raze: "Dwarft", lvl: "3" }])
			.then((response) => {
				if (response["success"]) {
					return res.json(response.response);
				} else {
					console.error("PROCEDURE DID NOT SUCCESS: " + pageStartGame);
					return next();
				}
			})
			.catch((error) => {
				console.error("ROUTE ERROR: " + pageStartGame);
				return next();
			});
	});

	router.route(`/${pageGame}`).get((req, res, next) => {
		keepPlaying(req.query.action)
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
