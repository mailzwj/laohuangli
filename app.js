//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // console.log('Launch');
  },
  globalData:{
    appName: '老黄历',
    author: 'Mr.Zheng'
  },
  getDateDetail: function(dateStr, callback) {
    var that = this;
    var api = 'https://v.juhe.cn/laohuangli/d';
    // 可前往https://dashboard.juhe.cn/data/index/apply，搜索“老黄历”申请接口调用appKey
    var appKey = '<Your appKey>';
    wx.request({
      url: api,
      data: {
        key: appKey,
        date: dateStr
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (typeof callback === 'function') {
          callback.call(that, data);
        }
      }
    });
  }
})
