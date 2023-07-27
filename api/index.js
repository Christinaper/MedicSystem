// 统一导入导出
const category = require('./modules/category');
const home = require('./modules/home')
const user = require('./modules/user')
const address = require('./modules/address')
const product = require('./modules/product')
const cart = require('./modules/cart')
const order = require('./modules/order')

module.exports = { category, home, user, address, product, cart, order };