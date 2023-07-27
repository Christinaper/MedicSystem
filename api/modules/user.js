const service = require("../../utils/service.js").service;

// module.exports.login = data => service({url: "/medicine/user/login"}, data);

module.exports.login = data => service({url: "/medicine/user/login?username=" + data.username + "&password=" + data.password});
