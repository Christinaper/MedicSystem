// 自定义封装promise版的wx.request
module.exports.service = function(userOption) {
  userOption.url = "http://192.168.110.250:4002" + userOption.url;
  return new Promise((resolve, reject) => {
    wx.request({
      ...userOption,
      success: result => {
        resolve(result.data);
      }
    })
  })
}
