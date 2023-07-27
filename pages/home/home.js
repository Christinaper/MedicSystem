// pages/home/home.js
const computedBehavior = require('miniprogram-computed').behavior;
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
Page({
  behaviors: [computedBehavior],
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    avatar: "",
    background: [],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id }); 
  },
  goToSearch() {
    wx.navigateTo({ url: '/pages/home/search/search'}); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const data = await api.home.getCarousel();
    const recommend = await api.home.getRecommend();
    const arr = data.data.map(item => item.productImage);
    this.setData({ background: arr });
    this.setData({ recommend: recommend.data });
    console.log(arr);
    console.log(recommend);
    const userInfo = app.globalData.userInfo;
    // console.log('这里'+JSON.stringify(app.globalData.userInfo));
    this.setData({ 'avatar': userInfo.avatar});
  },
})