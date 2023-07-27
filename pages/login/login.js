// pages/login/login.js
const api = require('../../api/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      username: "",
      password: "",
    },
    errorMessage: '', // 用于显示错误信息提示
  },
  onInputUsername(e) {
    this.setData({
      'model.username': e.detail.value // e.detail 返回的是一个对象而不是一个字符串。而使用 e.detail.value 来获取用户输入的字符串值。
    });
  },
  onInputPassword(e) {
    this.setData({
      'model.password': e.detail.value
    });
  },
  async login() {
    const { username, password } = this.data.model;
    // 表单验证
    if(!username || !password) this.setData({errorMessage:'用户名和密码不能为空'})
    // else-if
    else this.setData({errorMessage:''})
    try {
      // 发送用户名和密码到服务器端接口, 获取token
      const response = await api.user.login(this.data.model);
      const { code, msg, data } = response;
      if(code === 0) {
        // 登录成功，保存用户信息到全局状态
        app.globalData.userInfo = data;
        wx.setStorageSync('userInfo', data);
        // 将用户的信息和登录状态保存到本地缓存中
        const token = msg;
        wx.setStorageSync('token', token);
        // 触发登录成功事件，通知其他页面更新数据
        if(app.onLoginSuccessCallback) {
          app.onLoginSuccessCallback();
        }
        // 跳转到主页面
        wx.switchTab({ url: '/pages/home/home'})
      } else {
        // 登录失败，处理错误逻辑
        console.error('登录失败', msg);
      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
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
  onShow() {

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
// loginForm: {
//   loginId: '',
//   password: '',
//   loginIdRules:{
//     type: 'email',
//     required: true,
//     message: '邮箱地址不合法',
//     trigger: 'change'
//   },
//   passwordRules: [
//     { required: true, message: '请输入登录密码', trigger: 'blur' },
//     { min: 8, max: 20, message: '密码长度在8-20个字符之间', trigger: 'blur' },
//     { pattern: '^[A-Za-z0-9]+$', message: '密码必须由数字字母组成',trigger: 'blur'}
//   ],
// },