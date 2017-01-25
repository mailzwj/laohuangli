//index.js
var utils = require('../../utils/util.js');
Page({
  data: {
    userInfo: {}
  },
  saveData: {},
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  getTableArray: function(year, month) {
    var date = year && month ? new Date(year, month - 1, 1) : new Date();
    var dayCount = 0;
    var startRow = 0;
    var tableArray = [];
    var diffStart = 0;
    var todayStr = utils.format(new Date(), '{Y}-{M}-{D}');
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    dayCount = date.getDate();
    date.setDate(1);
    diffStart = date.getDay();
    for (var i = 1; i <= dayCount; i++) {
      if (!utils.isArray(tableArray[startRow])) {
        tableArray[startRow] = Array(7);
      }
      date.setDate(i);
      var lunDate = utils.e2c(date.getFullYear(), date.getMonth(), i).day;
      var tmpDate = (lunDate < 11) ? '初' : ((lunDate < 20) ? '十' : ((lunDate < 30) ? '廿' : '三十'));
      if (lunDate % 10 != 0 || lunDate == 10) {
        tmpDate += utils.numString.charAt((lunDate - 1) % 10);
      }
      var dateStr = utils.format(date, '{Y}-{M}-{D}');
      tableArray[startRow][date.getDay()] = {
        date: dateStr,
        calendar: utils.doubleNumber(i),
        lunar: tmpDate,
        isToday: dateStr === todayStr
      };
      if ((i + diffStart) % 7 === 0) {
        startRow++;
      }
    }
    return tableArray;
  },
  getTitle: function(year, month, date) {
    // 格式化农历日期
    var lunarObj = utils.e2c(year, month, date);
    var lunYear = '';
    lunYear += utils.tgString.charAt((lunarObj.year - 4) % 10);
    lunYear += utils.dzString.charAt((lunarObj.year - 4) % 12);
    lunYear += "(";
    lunYear += utils.sx.charAt((lunarObj.year - 4) % 12);
    lunYear += ")年";
    var monStr = utils.format(new Date(year, month, date), '{Y}年{M}月');
    var lunMon = lunYear + utils.monString.charAt(lunarObj.month - 1) + '月';
    return {
      month: monStr,
      lunMonth: lunMon
    };
  },
  onLoad: function () {
    // console.log('onLoad')
    var that = this;
    var today = new Date();
    var tableArray = [];
    var itemHeight = '20%';
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    var titleObj = this.getTitle(year, month, date);

    tableArray = this.getTableArray(year, month + 1);
    itemHeight = 1 / tableArray.length * 100 + '%';

    this.saveData.currentDate = year + '-' +  month + '-' + date;

    this.setData({
      month: year + '-' +  month + '-' + date,
      dateTable: tableArray,
      itemHeight: itemHeight,
      date: {
        calendar: titleObj.month,
        lunar: titleObj.lunMonth
      }
    });
    //调用应用实例的方法获取全局数据
    // app.getDateDetail('2017-01-22', function(data) {
    //   console.log(data);
    // });
  },
  toDetail: function(e) {
    var target = e.currentTarget;
    var data = target.dataset;
    var date = data.date;
    wx.navigateTo({
      url: '../detail/detail?date=' + date
    });
  },
  goPrevMonth: function(e) {
    var target = e.currentTarget;
    var data = target.dataset;
    var dm = data.month;
    var dArr = dm.split('-');
    var y = +dArr[0] || 1970;
    var m = +dArr[1] || 0;
    var d = +dArr[2] || 1;

    var today;
    var tableArray = [];
    var itemHeight = '20%';
    var year;
    var month;
    var date;
    var titleObj;

    if (m <= 0) {
      m = 11;
      y -= 1;
    } else {
      m -= 1;
    }
    today = new Date(y, m, 1);
    year = today.getFullYear();
    month = today.getMonth();
    date = today.getDate();
    titleObj = this.getTitle(year, month, date);

    tableArray = this.getTableArray(year, month + 1);
    itemHeight = 1 / tableArray.length * 100 + '%';

    this.saveData.currentDate = year + '-' +  month + '-' + date;

    this.setData({
      month: year + '-' +  month + '-' + date,
      dateTable: tableArray,
      itemHeight: itemHeight,
      date: {
        calendar: titleObj.month,
        lunar: titleObj.lunMonth
      }
    });
  },
  goNextMonth: function(e) {
    var target = e.currentTarget;
    var data = target.dataset;
    var dm = data.month;
    var dArr = dm.split('-');
    var y = +dArr[0] || 1970;
    var m = +dArr[1] || 0;
    var d = +dArr[2] || 1;

    var today;
    var tableArray = [];
    var itemHeight = '20%';
    var year;
    var month;
    var date;
    var titleObj;

    if (m >= 11) {
      m = 0;
      y += 1;
    } else {
      m += 1;
    }
    today = new Date(y, m, 1);
    year = today.getFullYear();
    month = today.getMonth();
    date = today.getDate();
    titleObj = this.getTitle(year, month, date);

    tableArray = this.getTableArray(year, month + 1);
    itemHeight = 1 / tableArray.length * 100 + '%';

    this.saveData.currentDate = year + '-' +  month + '-' + date;

    this.setData({
      month: year + '-' +  month + '-' + date,
      dateTable: tableArray,
      itemHeight: itemHeight,
      date: {
        calendar: titleObj.month,
        lunar: titleObj.lunMonth
      }
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
    var dateStr = that.saveData.currentDate || '1970-0-1';
    var dArr = dateStr.split('-');
    var y = +dArr[0];
    var m = +dArr[1];
    var d = +dArr[2];

    var today;
    var tableArray = [];
    var itemHeight = '20%';
    var year;
    var month;
    var date;
    var titleObj;

    if (Math.abs(delta) < 50) {
      return false;
    }
    if (delta < 0) {
      if (m >= 11) {
        m = 0;
        y += 1;
      } else {
        m += 1;
      }
    } else {
      if (m <= 0) {
        m = 11;
        y -= 1;
      } else {
        m -= 1;
      }
    }
    today = new Date(y, m, 1);
    year = today.getFullYear();
    month = today.getMonth();
    date = today.getDate();
    titleObj = this.getTitle(year, month, date);

    tableArray = this.getTableArray(year, month + 1);
    itemHeight = 1 / tableArray.length * 100 + '%';

    this.saveData.currentDate = year + '-' +  month + '-' + date;

    this.setData({
      month: year + '-' +  month + '-' + date,
      dateTable: tableArray,
      itemHeight: itemHeight,
      date: {
        calendar: titleObj.month,
        lunar: titleObj.lunMonth
      }
    });
  }
});
