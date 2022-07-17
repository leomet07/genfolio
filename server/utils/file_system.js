const fs = require("fs-extra");
let path = require("path");
const cheerio = require("cheerio");

async function copy_template(template, new_name) {
	const start = path.join("templates", template); // must be run from root of server folder
	const end = path.join("sites", new_name);

	// if (process.env.DEV != "true") {
	// 	if (fs.existsSync(end)) {
	// 		throw new Error(`Site at ${end} already exists!`);
	// 	}
	// }

	await fs.copy(start, end);

	const success = fs.existsSync(end);

	if (!success) {
		throw new Error("Folder could not be successfully created");
	}

	return success;
}

async function edit_files(github_username, data) {
	let { repos, template, name, bio, tags } = data;
	console.log(`Editing the files, based off template ${template}...`);

	let indexpath = path.join("sites", github_username, "index.html");
	const indexhtml = await fs.promises.readFile(indexpath, "utf8");

	let $ = cheerio.load(String(indexhtml));

	if (name) {
		$("#name").text(name);
	}
	if (bio){
		$("#bio").text(bio);
	}
	if (tags){
		$("#description_tags").html(
			tags.map((v) => `<span class="hidden_span">${v}</span>`)
		);
	}
	

	$("#github_link").attr("href", "https://github.com/" + github_username);

	await fs.promises.writeFile(indexpath, $.root().html());

	let projectspath = path.join(
		"sites",
		github_username,
		"projects",
		"index.html"
	);
	const projectshtml = await fs.promises.readFile(projectspath, "utf8");

	$ = cheerio.load(String(projectshtml));
	
	if (name){
		$("#name").text(name);
	}

	$("#github_link").attr("href", "https://github.com/" + github_username);

	if (repos){
		let added_up_divs = "";
		for (let i = 0; i < repos.length; i++) {
			let repo = repos[i];
	
			added_up_divs =
				added_up_divs +
				`
						<div class="project">
							<a href="${repo.url}">
								<h2 class="project_name">Name: ${repo.name}</h2>
								<h2 class="project_name">Language: ${repo.language}</h2>
							</a>
						</div>
				`;
		}
		$("#projects").html(added_up_divs);
	}
	
	
	await fs.promises.writeFile(projectspath, $.root().html());

	// Write the edited page

	// TODO: Loop through the user data and add a <section> into the body with each project
	return true;
}

module.exports = { copy_template, edit_files };
