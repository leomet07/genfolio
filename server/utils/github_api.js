const fetch = require("node-fetch");

(async function () {
	console.log("Hello world, top level await");

	const data = await get_user_data("leomet07");
	console.log(data);
})();
async function get_user_data(username) {
	console.log(username);
	return { foo: "bar" };
}
module.exports = { get_user_data };
