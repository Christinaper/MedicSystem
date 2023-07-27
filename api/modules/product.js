const service = require("../../utils/service.js").service;

module.exports.getData = fid => service({url: "/medicine/product/" + fid});
module.exports.getCollectList = uid => service({url: "/medicine/api/collect/" + uid});
module.exports.addToCollect = data => service({url: "/medicine/api/collect", method: "post", data});
module.exports.removeCollectList = pid => service({url: "/medicine/api/collect/" + pid, method: "delete"});

module.exports.getHistoryList = uid => service({url: "/medicine/api/productHistory/" + uid});
module.exports.search = data => service({url: "/medicine/product/list?name=" + data.name + "&dscp=" + data.dscp});
