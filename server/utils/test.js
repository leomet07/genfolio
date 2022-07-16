const gh = require("./github_api");

(async function () {
	// console.log(await gh.get_repos([{'owner': "leomet07", 'name': "hackathon-practice"}]));
	// console.log(await gh.get_user_repos_shallow("TheEgghead27"));
	console.log(await gh.get_user_shallow("leomet07"));
})();
