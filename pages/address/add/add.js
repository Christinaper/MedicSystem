// pages/address/edit/edit.js
const api = require('../../../api/index');
const app = getApp(); // 获取小程序实例
import Notify from '../../../miniprogram_npm/vant-weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: {
      addr: "",
      area: "",
      city: "",
      createTime: "",
      id: null,
      province: "",
      receiverName: "",
      receiverPhone: "",
      updateTime: "",
      userId: null
    }
  },

  // 定义一个onInput方法，接收事件对象作为参数
  onInput(e) {
    // 从事件对象中获取输入值和子属性名
    const value = e.detail;
    const key = e.currentTarget.dataset.key;
    // console.log(e);
    // console.log(value, key);
    // 使用setData方法更新data对象中的addr属性的子属性，使用数据路径的形式
    this.setData({ [`addr.${key}`]: value });
  },

  async addAddress() {
    // 使用this.data.addr来访问addr的值
    this.setData({'addr.createTime': "", 'addr.updateTime': "" })
    const res = await api.address.addAddress(this.data.addr);
    // const res = await api.address.editAddress(JSON.stringify(this.data.addr));
    console.log('addrrrr+' + JSON.stringify(this.data.addr));
    // 判断修改是否成功???????????????????????????????????怎么算成功呢？？？？？
    // if(res.success) {
      wx.redirectTo({url: '/pages/address/address'})
      console.log(23232);
      Notify('添加成功'),
      this.setData({addr: res.data})
    // } else {
      // Notify('修改失败')
    //   console.log('000000000000000000000');
    //   console.log(res.success);
    // }
    // console.log(this.data.addr);
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
    // const id = options.id; // 获取传递过来的id参数
    const userInfo = app.globalData.userInfo;
    this.setData({'addr.userId': userInfo.id})
    // const list = await api.address.getEditAddress(id); // list是一个对象，不是Promise
    // console.log(JSON.stringify(list)); // 打印list的字符串表示，而不是[object Object]
    // this.setData({ addr: { ...this.data.addr, ...list.data } }); // 扩展运算符，把this.data.addr对象和list对象合并成一个新的对象，然后传给setData方法，更新了data对象的addr属性
    // console.log(this.data.addr);
  }
})