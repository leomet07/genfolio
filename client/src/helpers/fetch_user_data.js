async function fetch_user_data(username) { 
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ github_username: username }),
	};

	const res = await fetch("https://genfolio.xyz" + "/api/shallow_user", options);
	const rjson = await res.json();


	return rjson.user_data;
}

export default fetch_user_data;
