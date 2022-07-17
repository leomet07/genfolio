async function submit_changes(username, template, data) {
	const body = {
		github_username: username,
		template: template,
		...data
	}
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	};

	console.log("Body: ", body)

	const res = await fetch(
		"https://genfolio.xyz" + "/api/generate_site",
		options
	);
	const rjson = await res.json();

	return rjson.site;
}

export default submit_changes;
