const { get_user_data } = require("./github_api");

(async function () {
	console.log(await get_user_data("leomet07"));
})();
