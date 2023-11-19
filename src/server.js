/* DEPENDENCIES */
import http from "http";

/* APP MODULES */
import app from "./app.js";

app.set("port", 3000);

const server = http.createServer(app);

server.listen(3000);
server.on("error", (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + 3000 : "Port " + 3000;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
		default:
			throw error;
	}
});

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
	console.debug("Listening on " + bind);
});
