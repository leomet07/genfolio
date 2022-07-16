const fs = require("fs-extra");
let path = require("path");
const cheerio = require("cheerio");

async function copy_template(template, new_name) {
	const start = path.join("templates", template); // must be run from root of server folder
	const end = path.join("sites", new_name);

	if (process.env.DEV != "true") {
		if (fs.existsSync(end)) {
			throw new Error(`Site at ${end} already exists!`);
		}
	}

	await fs.copy(start, end);

	const success = fs.existsSync(end);

	if (!success) {
		throw new Error("Folder could not be successfully created");
	}

	return success;
}

async function edit_files(github_username, repos) {
	console.log("Editing the files...");
	let indexpath = path.join("sites", github_username, "index.html");
	const indexhtml = await fs.promises.readFile(indexpath, "utf8");

	const $ = cheerio.load(String(indexhtml));

	$("#username").text(github_username);

	let added_up_divs = "";
	for (let i = 0; i < repos.length; i++) {
		let repo = repos[i];

		added_up_divs =
			added_up_divs +
			`
					<div class="project">
						<h2>Name: ${repo.name}</h2>
						<h2>URL: ${repo.url}</h2>
						<h2>Language: ${repo.language}</h2>
					</div>
			`;
	}
	$("#projects").html(added_up_divs);

	// Write the edited page
	await fs.promises.writeFile(indexpath, $.root().html());

	// TODO: Loop through the user data and add a <section> into the body with each project
	return true;
}

module.exports = { copy_template, edit_files };
