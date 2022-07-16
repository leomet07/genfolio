const router = require("express").Router();
const { copy_template, edit_files } = require("../utils/file_system");
const { get_user_shallow, get_repos } = require("../utils/github_api");
const middlewares = require("../middlewares");

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

router.get("/shallow_user", async (req, res, next) => {
	try {
		const github_username = req.body.github_username;
		if (!github_username) {
			throw new Error("No GitHub username specified. ");
		}

		const user_data = await get_user_shallow(github_username).catch(
			(err) => {
				throw new Error(err);
			}
		);

		return res.json({
			success: true,
			user_data: user_data,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/generate_site", async (req, res, next) => {
	try {
		const github_username = req.body.github_username;
		const repos = req.body.chosen_repos;

		if (!github_username) {
			throw new Error("No GitHub username specified. ");
		}
		if (!repos) {
			throw new Error("No GitHub repositories specified. ");
		}

		const template_success = await copy_template("one", github_username);

		if (!template_success) {
			throw new Error("Something went wrong!");
		}

		const edit_success = await edit_files(github_username, repos);
		const rooturl = process.env.DEV
			? "http://localhost:5678"
			: "https://genfolio.xyz";
		return res.json({
			success: true,
			site: rooturl + "/site/" + github_username,
		});
	} catch (error) {
		next(error);
	}
});

// Configure a middleware for 404s and the error handler
router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports.router = router;
