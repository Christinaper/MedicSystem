// pages/profile/profile.js
const app = getApp(); // 获取小程序实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      avatar: "",
      nickname: ""
    },
    showOutDialog: false,
    showInDialog: false
  },
  // 显示对话框
  showLogoutDialog() {
    this.setData({ showOutDialog: true });
  },
  // 隐藏对话框
  hideLogoutDialog() {
    this.setData({ showOutDialog: false });
  },
  showLoginDialog() {
    this.setData({ showInDialog: true });
  },
  // 隐藏对话框
  hideLoginDialog() {
    this.setData({ showInDialog: false });
  },
  logout() {
    // 清除存储的登录信息
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    // 清空全局变量中的用户信息
    app.globalData.userInfo = null;
    // 跳转到首页
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  // 登录确认方法
  loginConfirm() {
    // 在这里执行登录的逻辑，跳转到登录页面
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },
  toOrder() {
    wx.navigateTo({url: '/pages/order/order'});
  },
  toAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    });
  },
  toCollect(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({url: `/pages/collect/collect?page=${id}`});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = app.globalData.userInfo;
    console.log('这里'+JSON.stringify(app.globalData.userInfo));
    this.setData({ 'info.avatar': userInfo.avatar, 'info.nickname': userInfo.nickname });
  },
  onShow() {
    // 在页面显示时监听登录成功事件
    app.onLoginSuccessCallback = () => {
      // 登录成功后更新页面数据
      const userInfo = app.globalData.userInfo;
      this.setData({
        'info.avatar': userInfo.avatar,
        'info.nickname': userInfo.nickname
      });
    };
  },
})