import express from "express";

// PROCEDURES
import procedure1 from "./procedures/page1.js";

const page1 = "page1";

export default () => {
	const router = express.Router();

	router.route(`/${page1}`).get((req, res, next) => {
		procedure1()
			.then((response) => {
				if (response["success"]) {
					return res.json({});
				} else {
					return next(console.log("PROCEDURE DID NOT SUCCESS: " + page1));
				}
			})
			.catch((error) => {
				return next(console.log("ROUTE ERROR: " + page1));
			});
	});

	return router;
};
