const dotenv = require("dotenv");
dotenv.config();
const octokit = require("octokit");

console.log(process.env.GH_TOKEN);
const session = new octokit.Octokit({ auth: process.env.GH_TOKEN });
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
// greatly increased rate-limits if authentication is included

async function get_user_shallow(username) {
	// @param username: String representing the user's GitHub username (potentially provided with OAuth2 if we have the time)
	// returns a somewhat minimized Object representing the user with some relevant profile data
	// TODO: handle request errors :)
	const user = await session.request(`GET /users/${username}`).then(res =>
		{
			return {
				"username": res.data.login,
				"name": res.data.name,
				"pfp": res.data.avatar_url,
				"url": res.data.html_url,
				"bio": res.data.bio,
				"followers": res.data.followers,
				"public_repos": res.data.public_repos,
				"repos": []
			}
		}
	);

	// get all repos using a while loop (to respect GitHub pagination limits)
	let repos_left = user.public_repos;
	while (repos_left > 0) {
		const repoPage = (await session.request(`GET /users/${username}/repos?per_page=${Math.min(repos_left, 100)}`)).data.map(
				(repo) => {
					return {
						"name": repo.full_name,
						"url": repo.html_url,
						"stars": repo.stargazers_count
					}
				}
			);
		user.repos = [...user.repos, ...repoPage];
		repos_left -= 100;
	}

	return user;
}

async function get_repos(repositories) {
	// @param repository - Array of Objects {owner: string, name: string}

	const repos = [];

	for (const repo in repositories) {
		console.log(repositories[repo]);
		repos.push(await session.graphql(
			`query getRepo($owner: String!, $name: String!) {
				repository(owner: $owner, name: $name) {
					name
					url
					languages(first: 3) {
						edges {
							node {
								name
							}
						}
					}
					description
				}
			}`,
			{owner: repositories[repo].owner, name: repositories[repo].name}
			).then(res => res.repository)
		);
		repos[repo].languages = repos[repo].languages.edges.map(node => node.node.name);
	}


	return repos;
}

module.exports = { get_repos, get_user_shallow };
