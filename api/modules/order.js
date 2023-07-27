const service = require("../../utils/service.js").service;

module.exports.getOrder = uid => service({url: "/medicine/order/" + uid});
module.exports.getOrderNum = uid => service({url: "/medicine/order/count/" + uid});
module.exports.beOrder = data => service({url: "/medicine/order", method: "post", data});

module.exports.cancelOrder = oid => service({url: "/medicine/order/" + oid, method: "delete"});
