const port = process.env.PORT || 5678;
const dev_url = "http://127.0.0.1:" + port;
const prod_url = "https://genfolio.xyz/";

function get_server_running_url(){
	return (process.env.DEV ? dev_url : prod_url)
}

function get_server_running_port(){
	return port;
}

module.exports = { get_server_running_url, get_server_running_port };

