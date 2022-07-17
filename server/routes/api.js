const router = require("express").Router();
const { copy_template, edit_files } = require("../utils/file_system");
const {
	get_user_shallow,
	check_if_user_exists,
} = require("../utils/github_api");
const middlewares = require("../middlewares");
const rateLimit = require("express-rate-limit");

router.get("/", (req, res) => {
	res.json({ message: "Hello world from /api." });
});

// GitHub shallow_user rate limit: 10 requests / 300 seconds
const ghUserLimit = rateLimit({
	max: 10,
	windowMs: 5 * 60 * 1000,  // 5 minutes

	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const shallow_user_handler = async (req, res, next) => {
	try {
		const github_username = req.body.github_username;
		if (!github_username) {
			throw new Error("No GitHub username specified. ");
		}

		const doesUserExist = await check_if_user_exists(github_username);

		if (!doesUserExist){
			throw new Error("Github user " + github_username + " does not exist.")
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
};
router.get("/shallow_user", ghUserLimit, shallow_user_handler);
router.post("/shallow_user", ghUserLimit, shallow_user_handler);

// site generation rate limit: 60 requests / 60 seconds  (implicit, inherited from full express() app)
router.post("/generate_site", async (req, res, next) => {
	try {
		const github_username = req.body.github_username;
		const repos = req.body.repos;
		const template = req.body.template;
		const name = req.body.name;
		const bio = req.body.bio;
		const tags = req.body.tags;
		const devpost_username = req.body.devpost_username;
		const instagram_username = req.body.instagram_username;
		const linkedin_username = req.body.linkedin_username;

		if (!github_username) {
			throw new Error("No GitHub username specified. ");
		}

		const doesUserExist = await check_if_user_exists(github_username);

		if (!doesUserExist){
			throw new Error("Github user " + github_username + " does not exist.")
		}

		if (!template) {
			throw new Error("No template specified. ");
		}

		const template_success = await copy_template(template, github_username);

		if (!template_success) {
			throw new Error("Something went wrong!");
		}
		data = { repos, template, name, bio, tags, devpost_username, instagram_username, linkedin_username};

		const edit_success = await edit_files(github_username, data);
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
