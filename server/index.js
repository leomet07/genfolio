const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const zip = require("express-easy-zip");
require("dotenv").config();

const app = express();

const get_running_server_info = require("./utils/get_running_server_info");
// Middleware
app.use(cors());
app.use(express.json());
app.use(zip());
app.use(morgan("tiny"));

// site-wide rate limit: 120 requests / 60 seconds
const baseLimit = rateLimit({
	max: 120,
	windowMs: 60 * 1000,

	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(baseLimit);

// import Routes
const apiRouter = require("./routes/api").router;

app.use("/site", express.static(__dirname + "/sites"));

app.use("/dev_templates", express.static(__dirname + "/templates"));

// Routes Middleware
app.use("/api/", apiRouter);

app.use(express.static(__dirname + "/public"));

app.get(["/", "/*"], function (req, res, next) {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = get_running_server_info.get_server_running_port();
app.listen(port, () => {
	console.log(
		"Server is up and running at " +
			get_running_server_info.get_server_running_url()
	);
});
