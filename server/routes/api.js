const router = require("express").Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

module.exports.router = router;
