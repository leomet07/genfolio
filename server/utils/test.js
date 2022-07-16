const {get_user_data} = require("./github_api");


(async function() {
    console.log(await get_user_data("leomet07"));
    console.log(await get_user_data("TheEgghead27"));
}());