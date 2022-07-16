const router = require("express").Router();
const copy_template = require("../utils/copy_template");

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

router.post("/generate_site", async (req, res, next) => {
	try {
		const github_username = req.body.github_username;

		if (!github_username) {
			throw new Error("No github username specified. ");
		}

		const success = await copy_template("one", github_username);

		if (!success) {
			throw new Error("Something went wrong!");
		}

		res.json({
			success: success,
			site: "/site/" + github_username,
		});
	} catch (error) {
		next(error);
	}
});
module.exports.router = router;
