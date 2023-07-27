// pages/address/order/order.js
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id }); 
  },
  async cancelOrder(e) {
    const oid = parseInt(e.currentTarget.dataset.oid);
    console.log('oid'+oid);
    await api.order.cancelOrder(oid);
    // 确定？
    // 更新
    const userInfo = app.globalData.userInfo;
    // 拿uid获取orderList
    const orderList = await api.order.getOrder(userInfo.id);
    this.setData({orderList: orderList.data});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取uinfo
    const userInfo = app.globalData.userInfo;
    // 拿uid获取orderList
    const orderList = await api.order.getOrder(userInfo.id);
    this.setData({orderList: orderList.data});
    console.log(this.data.orderList);
  }
})