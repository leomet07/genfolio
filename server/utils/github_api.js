const dotenv = require("dotenv");
dotenv.config();
const octokit = require("octokit");
const fetch = require("node-fetch")
const session = new octokit.Octokit(
	process.env.GH_TOKEN ? { auth: process.env.GH_TOKEN } : {}
);

// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
// greatly increased rate-limits if authentication is included

async function handled_rest(url) {
	// wrapper function for Octokit.request
	// throw error message string for catching/handling by the API

	const request = await session.request(url).catch((err) => {
		throw err.message;
	});
	return request.data;
}

async function handled_gql(query, body) {
	// wrapper function for Octokit.graphql
	// throw error message string for catching/handling by the API

	return await session.graphql(query, body).catch((err) => {
		throw err.errors[0].message;
	});
}

async function get_user_shallow(username) {
	// @param username: String representing the user's GitHub username (potentially provided with OAuth2 if we have the time)
	// returns a somewhat minimized Object representing the user with some relevant profile data
	const res = await handled_rest(`GET /users/${username}`);
	const user = {
		username: res.login,
		name: res.name,
		pfp: res.avatar_url,
		url: res.html_url,
		bio: res.bio,
		followers: res.followers,
		public_repos: res.public_repos,
		repos: [],
	};

	// get all repos using a while loop (to respect GitHub pagination limits)
	let repos_left = user.public_repos;
	while (repos_left > 0) {
		const repoPage = (
			await session.request(
				`GET /users/${username}/repos?per_page=${Math.min(
					repos_left,
					100
				)}`
			)
		).data.map((repo) => {
			return {
				name: repo.full_name,
				url: repo.html_url,
				stars: repo.stargazers_count,
				language : repo.language
			};
		});
		user.repos = [...user.repos, ...repoPage];
		repos_left -= 100;
	}

	return user;
}

async function check_if_user_exists(username) {
	const res = await fetch("https://api.github.com/users/" + username);
	const rjson = await res.json()
	return !(rjson.message == "Not Found");
}

module.exports = { get_user_shallow, check_if_user_exists };
