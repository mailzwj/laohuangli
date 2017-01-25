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
    var appKey = '073a2856e9b3187f878ac05baf204d9e';
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