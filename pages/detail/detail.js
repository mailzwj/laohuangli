// pages/detail/detail.js
var app = getApp();
var utils = require('../../utils/util.js');

Page({
  data:{},
  saveData: {},
  fetchData: function(date, callback) {
    var that = this;
    that.saveData.currentDate = date;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    app.getDateDetail(date, function(data) {
      var rs;
      wx.hideToast();
      if (data.statusCode) {
        rs = data.data.result;
      } else {
        rs = {
          errMsg: '接口数据请求失败！<br>稍后再试'
        };
      }
      if (typeof callback === 'function') {
        callback.call(that, rs);
      }
    });
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var dateStr = options['date'] || '1970-0-1';
    that.setData({
      date: dateStr
    });
    that.fetchData(dateStr, function(data) {
      that.setData(data);
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  goPrevDay: function(e) {
    var that = this;
    var target = e.currentTarget;
    var data = target.dataset;
    var day = data.day || '1970-01-01';
    var date, dateStr;
    day = day.replace(/-/g, '/');
    date = new Date(day);
    date.setDate(date.getDate() - 1);
    dateStr = utils.format(date, '{Y}-{M}-{D}');
    that.setData({
      date: dateStr
    });
    that.fetchData(dateStr, function(data) {
      that.setData(data);
    });
  },
  goNextDay: function(e) {
    var that = this;
    var target = e.currentTarget;
    var data = target.dataset;
    var day = data.day || '1970-01-01';
    var date, dateStr;
    day = day.replace(/-/g, '/');
    date = new Date(day);
    date.setDate(date.getDate() + 1);
    dateStr = utils.format(date, '{Y}-{M}-{D}');
    that.setData({
      date: dateStr
    });
    that.fetchData(dateStr, function(data) {
      that.setData(data);
    });
  },
  touchStart: function(e) {
    var that = this;
    var obj = e.changedTouches;
    that.saveData.startX = obj[0].pageX;
  },
  touchEnd: function(e) {
    var that = this;
    var obj = e.changedTouches;
    var endX = obj[0].pageX;
    var delta = endX - that.saveData.startX;
    var day = that.saveData.currentDate || '1970-01-01';
    var date, dateStr;
    if (Math.abs(delta) < 50) {
      return false;
    }
    day = day.replace(/-/g, '/');
    date = new Date(day);
    if (delta < 0) {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() - 1);
    }
    dateStr = utils.format(date, '{Y}-{M}-{D}');
    that.saveData.currentDate = dateStr;
    that.setData({
      date: dateStr
    });
    that.fetchData(dateStr, function(data) {
      that.setData(data);
    });
  }
});