const router = require("express").Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

router.post("/generate_template", async (req, res, next) => {
	try {
		console.log(req.body);

		res.json({
			data: {
				foo: "bar",
			},
		});
	} catch (error) {
		next(error);
	}
});
module.exports.router = router;
