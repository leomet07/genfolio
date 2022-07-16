const router = require("express").Router();
const { copy_template, edit_files } = require("../utils/file_system");
const { get_user_data } = require("../utils/github_api");

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

router.post("/generate_site", async (req, res, next) => {
	try {
		const github_username = req.body.github_username;

		if (!github_username) {
			throw new Error("No github username specified. ");
		}

		const user_data = await get_user_data(github_username);

		const template_success = await copy_template("one", github_username);

		if (!template_success) {
			throw new Error("Something went wrong!");
		}

		const edit_success = await edit_files(github_username, user_data);
		return res.json({
			success: true,
			user_data: user_data,
			site: "/site/" + github_username,
		});
	} catch (error) {
		next(error);
	}
});
module.exports.router = router;
