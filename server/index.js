const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

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

app.use("/site", express.static("sites"));
//Routes Middleware
app.use("/api/", apiRouter);

app.use(
	express.static(__dirname + "/public", {
		setHeaders: function (res, path, stat) {
			res.set("Access-Control-Allow-Origin", "*");
			res.set(
				"Content-Security-Policy",
				"connect-src https://*.mydomain.com"
			);
			res.set("X-Frame-Options", "SAMEORIGIN");
			res.set("X-XSS-Protection", "1; mode=block");
			res.set("X-Content-Type-Options", "nosniff");
		},
	})
);

app.get(["/", "/*"], function (req, res, next) {
	// res.set("Content-Security-Policy", "connect-src https://*.mydomain.com");
	res.set("X-Frame-Options", "SAMEORIGIN");
	res.set("X-XSS-Protection", "1; mode=block");
	res.set("X-Content-Type-Options", "nosniff");
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5678;
app.listen(port, () => {
	console.log("Sever is up and running at http://127.0.0.1:" + port);
});
