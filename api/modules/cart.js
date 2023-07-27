const service = require("../../utils/service.js").service;

module.exports.addToCart = data => service({url: "/medicine/shopcart", method: "post", data});
module.exports.getCartList = uid => service({url: "/medicine/shopcart/" + uid})
module.exports.addOrMinus = data => service({url: "/medicine/shopcart/addorminus?id=" + data.id + "&value=" + data.value, method: "post"});