// pages/collect/collect.js
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const userInfo = app.globalData.userInfo;
    console.log(options.page);
    const page = parseInt(options.page)
    if(page === 1) {
      const list = await api.product.getCollectList(userInfo.id)
      this.setData({list: list.data})
    } else {
      const list = await api.product.getHistoryList(userInfo.id)
      this.setData({list: list.data})
    }
    console.log(this.data.list);
  }
})