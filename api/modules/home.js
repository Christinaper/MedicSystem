const service = require("../../utils/service.js").service;

module.exports.getData = () => service({url: "/medicine/product/list"});
module.exports.getCarousel = () => service({url: "/medicine/carousel"});
module.exports.getRecommend = () => service({url: "/medicine/recommend"});