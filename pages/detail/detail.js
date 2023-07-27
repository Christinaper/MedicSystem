// pages/detail/detail.js
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify'
Page({
  data: {
    list: [],
    collectList: [],
    removeId: null,
    cartPnum: null,
    collectState: false,
    params: {
      userId: null,
      productId: null
    },
    cartParams: {
      userId: null,
      productId: null,
      productCount: 1,
      productName: "",
      productImage: "",
      productPrice: null,
      productProduction: "",
      productDesc: ""
    }
  },
  async collect(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({ 'params.productId': id });
    await api.product.addToCollect(this.data.params)
    console.log(this.data.params);
    this.setData({collectState: true})
    Notify({text:'收藏成功', backgroundColor: '#167f7b'});
    // 刷新

    // this.isCollect()
  },
  async removecollect(e) {
    // pid 256
    console.log(this.data.removeId);
    // console.log(this.data.params.productId);
    await api.product.removeCollectList(this.data.removeId);
    // 取消收藏提醒
    this.setData({collectState: false})
    Notify('收藏已取消');
    // 刷新
    // this.isCollect()
  },
  goToCart() {
    wx.switchTab({ 
      url: '/pages/cart/cart',
    }); 
  },
  async addToCart() {
    console.log(this.data.params);
    console.log(this.data.list);
    this.setData(
      {
        'cartParams.userId': this.data.params.userId,
        'cartParams.productId': this.data.params.productId,
        'cartParams.productName': this.data.list.name,
        'cartParams.productImage': this.data.list.image,
        'cartParams.productPrice': this.data.list.price,
        'cartParams.productProduction': this.data.list.production,
        'cartParams.productDesc': this.data.list.dscp
      },
    )
    await api.cart.addToCart(this.data.cartParams)
    console.log(this.data.cartParams);
    // 成功
    Notify({text:'加入购物车成功', backgroundColor: '#167f7b'});
  },
  // isCollect() {
  //   for (const item of this.data.collectList) {
  //     // console.log('++++++'+JSON.stringify(this.data.collectList), +'++++++++++++++++++++++++'+item);
  //     if (item.product.id === this.data.params.productId) {
  //       // 执行与目标产品 ID 相同的操作
  //       console.log('执行操作A');
  //       this.setData({collectState: true})
  //       return;
  //     } else {
  //       // 执行与目标产品 ID 不同的操作
  //       console.log('执行操作B');
  //       this.setData({collectState: false})
  //       console.log(item);
  //       console.log(this.data.params.productId);
  //     }
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = parseInt(options.id); // 获取传递过来的productId
    this.setData({'params.productId': id});

    const list = await api.product.getData(id); // 使用解构赋值将 data 赋值给 list
    this.setData({list: list.data}); // 将 data 赋值给 list
    // console.log('list:'+ JSON.stringify(this.data.list));
    
    const userInfo = app.globalData.userInfo;
    this.setData({ 'params.userId': userInfo.id });

    const collectList = await api.product.getCollectList(userInfo.id)
    this.setData({collectList: collectList.data});
    // 判断收藏状态
    for (const item of collectList.data) {
      if (item.product.id === id) {
        // 执行与目标产品 ID 相同的操作
        console.log('执行操作A');
        this.setData({collectState: true})
        console.log('id+'+JSON.stringify(item.id));
        this.setData({removeId: item.id})
        return;
      } else {
        // 执行与目标产品 ID 不同的操作
        console.log('执行操作B');
        console.log(item.product.id, id);
      }
    }
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
    const cart = await api.cart.getCartList(userInfo.id)
    this.setData({'cartPnum': cart.data.count})
    // console.log('***************************'+JSON.stringify(cart.data.count));
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