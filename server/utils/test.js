const gh = require("./github_api");

(async function () {
	console.log(await gh.get_user_shallow("leomet07"));
})();
