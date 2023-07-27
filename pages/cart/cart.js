// pages/cart/cart.js
const api = require('../../api/index');
const app = getApp(); // 获取小程序实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId: null,
    cartList: [],
    amount: null,
    count: null,
    pnumParams: {
      id: null,
      value: null
    },
    addressList: [],
    orderParams: {
      id: null,
      userId: null,
      addressId: null,
      amount: null,
      number: "", //?
      status: -1,
      orderDetails: []
    }
  },
  async add(e) {
    const num = parseInt(e.currentTarget.dataset.num);
    const id = parseInt(e.currentTarget.dataset.id);
    console.log('num:'+num, 'id:'+id);
    this.setData({'pnumParams.id': id});
    const newnum = num + 1;
    this.setData({'pnumParams.value': newnum});
    console.log(this.data.pnumParams.value);
    await api.cart.addOrMinus(this.data.pnumParams);
    // 更新
    const cartList = await api.cart.getCartList(this.data.orderParams.userId);
    this.setData({cartList: cartList.data.saleShopcarts});
    this.setData({count: cartList.data.count})
    this.setData({amount: cartList.data.amount * 100});
  },
  async minus(e) {
    const num = parseInt(e.currentTarget.dataset.num);
    const id = parseInt(e.currentTarget.dataset.id);
    console.log('num:'+num, 'id:'+id);
    this.setData({'pnumParams.id': id});
    if (num > 1) {
      // 更新 item.productCount 的值，并触发页面重新渲染
      this.setData({'pnumParams.value': num - 1});
    }
    console.log(this.data.pnumParams.value);
    await api.cart.addOrMinus(this.data.pnumParams);
    // 更新
    const cartList = await api.cart.getCartList(this.data.orderParams.userId);
    this.setData({cartList: cartList.data.saleShopcarts});
    this.setData({count: cartList.data.count})
    this.setData({amount: cartList.data.amount * 100});
  },
  toAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  async onOrder() {
    // 判断地址？不然禁用
    this.setData({
      'orderParams.addressId': app.globalData.addressId,
      'orderParams.amount': this.data.amount / 100,
      'orderParams.orderDetails': this.data.cartList,
      'orderParams.createTime': '',
      'orderParams.updateTime': '',
    })
    // 删掉多余参数 去传参
    for (let i = 0; i < this.data.orderParams.orderDetails.length; i++) {
      delete this.data.orderParams.orderDetails[i].id;
      delete this.data.orderParams.orderDetails[i].createTime;
      delete this.data.orderParams.orderDetails[i].updateTime;
    }
    console.log(this.data.orderParams);
    await api.order.beOrder(this.data.orderParams)
    // 更新
    const cartList = await api.cart.getCartList(this.data.orderParams.userId);
    this.setData({cartList: cartList.data.saleShopcarts});
    this.setData({amount: cartList.data.amount * 100});
    this.setData({count: cartList.data.count})
    // 清空购物车
    // ************
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取uinfo
    const userInfo = app.globalData.userInfo;
    this.setData({'orderParams.userId': userInfo.id});
    // this.setData({ 'collectParams.userId': userInfo.id });
    // 拿uid获取cartList + 其中的总价
    const cartList = await api.cart.getCartList(userInfo.id);
    this.setData({cartList: cartList.data.saleShopcarts});
    this.setData({amount: cartList.data.amount * 100});
    this.setData({count: cartList.data.count})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
      // 获取地址
      const id = app.globalData.addressId; // 获取传递过来的id参数
      console.log('id:'+ id);
      this.setData({'addressId': id});
      if(id) {
        // app.globalData.cartId = ''; // ??清空全局变量 cartId，以便下次使用
        const addressList = await api.address.getEditAddress(id);
        this.setData({addressList: addressList.data});
      }
  }
})