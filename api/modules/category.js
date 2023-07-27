const service = require("../../utils/service.js").service;

module.exports.getList = data => service({url: "/medicine/category/list"}, data);
module.exports.getData = fid => service({url: "/medicine/category/product/" + fid});

// module.exports.getData = () => service({url: "/medicine/product/list"});

// module.exports.getData = () => service({url: "/medicine/category"});