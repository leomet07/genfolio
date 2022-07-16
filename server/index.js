const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const middlewares = require("./middlewares");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

// Only redirect to SSL if developer allows and states that machine running this has SSL to prevent crashes on computers without SSL
if (process.env.SSL == "true") {
	app.enable("trust proxy");

	app.use(function (req, res, next) {
		if (req.headers["x-forwarded-proto"] === "https") {
			return next();
		}
		res.redirect("https://" + req.headers.host + req.url);
	});
}

// import Routes
const apiRouter = require("./routes/api").router;

//Routes Middleware
app.use("/api/", apiRouter);
app.get("/", function (req, res) {
	res.json({ message: "Hello World to the project" });
});

// Configure a middleware for 404s and the error handler
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5678;
app.listen(port, () => {
	console.log("Sever is up and running at http://127.0.0.1:" + port);
});
