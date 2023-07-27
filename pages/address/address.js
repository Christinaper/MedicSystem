// pages/address/address.js
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserAddressList: []
  },
  edit(e) {
    const id = e.currentTarget.dataset.id;
    // console.log(e);
    // console.log(id + 'ppp');
    wx.navigateTo({ url: '/pages/address/edit/edit?id=' + id }); 
  },
  goToCart(e) {
    const id = e.currentTarget.dataset.id;
    console.log('获取id:'+id);
    app.globalData.addressId = id; // 设置全局变量 addressId
    wx.switchTab({ 
      url: '/pages/cart/cart',
    }); 
  },
  goToAdd() {
    wx.navigateTo({ 
      url: '/pages/address/add/add',
    }); 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const userInfo = app.globalData.userInfo;
    const UserAddressList = await api.address.getUserAddress(userInfo.id);
    console.log(UserAddressList);
    this.setData({ UserAddressList: UserAddressList.data })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})