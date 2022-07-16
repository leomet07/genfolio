const dotenv = require("dotenv");
dotenv.config();
const octokit = require("octokit");

console.log(process.env.GH_TOKEN);
const session = new octokit.Octokit({auth: process.env.GH_TOKEN})


async function get_user_data(username) {
    console.log(username);
    // let repos = (await session.request(`GET /users/${username}/repos`)).data;
    // let repos = (await session.request(`GET /users/${username}/pinnedItems`)).data;

    let repos = await session.graphql(
        `query getPinned($user: String!) {
  			user(login: $user) {
    			pinnedItems(first: 6, types: REPOSITORY) {
      				nodes {
        				... on Repository {
							name
							url
							forkCount
							homepageUrl
							languages(first: 1) {
								edges {
									node {
										name
									}
								}
							}
							watchers {
								totalCount
							}
							stargazerCount
						}
        			}
      			}
    		}
  		}`,
        {
            user: username
        }
    );

	repos = JSON.parse(JSON.stringify(repos));
	repos = repos.user.pinnedItems.nodes;
	if (repos.length < 1) throw "woops no repos";
    console.log('repos:', repos);
    // console.log('repos lang:', repos[0].languages.edges[0].node.name);


    // only return non-fork public repositories that aren't templates
    repos = repos.filter((repo) => {
        return (!(repo.fork || repo.private || repo.is_template))
    });

    return repos.map((repo) => {
        console.log(Object.keys(repo));
        return {
            "name": repo.name,   // repository name
            "url": repo.homepageUrl || repo.url,  // return linked site on sidebar, if unavailable, return GitHub repository
            "language": repo.languages.edges[0].node.name,  // primary language

            // repository statistic counts, may be worth sorting by
            "stars": repo.stargazerCount,
            "watchers": repo.watchers.totalCount,
            "forks_count": repo.forkCount
        }
    });
}

module.exports = {get_user_data};
