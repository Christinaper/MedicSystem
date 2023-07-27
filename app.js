// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
      this.globalData.userInfo = userInfo;
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    addressId: 0,
  },
  onLoginSuccessCallback: null, // 用于保存登录成功后的回调函数
})
