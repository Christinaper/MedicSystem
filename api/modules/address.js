const service = require("../../utils/service.js").service;

module.exports.getUserAddress = id => service({url: "/medicine/address/user/" + id});
module.exports.getEditAddress = id => service({url: "/medicine/address/" + id});
module.exports.editAddress = data => service({url: "/medicine/address", method: "put", data});
module.exports.addAddress = data => service({url: "/medicine/address", method: "post", data});