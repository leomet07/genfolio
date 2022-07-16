const fs = require("fs-extra");
let path = require("path");

async function copy_template(template, new_name) {
	const start = path.join("templates", template); // must be run from root of server folder
	const end = path.join("sites", new_name);

	if (fs.existsSync(end)) {
		throw new Error(`Site at ${end} already exists!`);
	}
	await fs.copy(start, end);

	const success = fs.existsSync(end);

	if (!success) {
		throw new Error("Folder could not be successfully created");
	}

	return success;
}

module.exports = copy_template;
