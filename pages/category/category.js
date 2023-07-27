// pages/category/category.js
const computedBehavior = require('miniprogram-computed').behavior;
const api = require('../../api/index');
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    listMain: [],
    activeId: 0,
  },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id }); 
  },
  watch: {
    'activeId': async function(newValue) {
      const listSub = await api.category.getData(newValue);
      this.setData({ listSub: listSub.data });
      console.log('listSub' + listSub);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 发Ajax请求一级分类
    const listMain = await api.category.getList(10);
    console.log('addad++++++'+JSON.stringify(listMain.data));
    this.setData({ listMain: listMain.data, activeId: listMain.data[0].id })
  },
  toggleId(e) {
    const id = e.currentTarget.dataset.id; //取藏的id
    if(this.data.activeId === id) return; // 判断激活状态
    this.setData({ activeId: id }); // 切换id
  }
})