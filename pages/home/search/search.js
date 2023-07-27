// pages/home/search/search.js
const api = require('../../../api/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchParams: {
      name: "",
      dscp: ""
    },
    searchList: []
  },
  async onSearch(e) {
    console.log('detail:'+e.detail);
    this.setData({'searchParams.name':e.detail.trim(), 'searchParams.dscp': e.detail.trim()});
    const searchList = await api.product.search(this.data.searchParams);
    this.setData({'searchList': searchList.data})
    console.log(this.data.searchList);
  },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id }); 
  }
})