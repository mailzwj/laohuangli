var dateTool = {
  CalendarData: [
    0x0b557, //1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520 // 2100
  ],
  madd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  tgString: '甲乙丙丁戊己庚辛壬癸',
  dzString: '子丑寅卯辰巳午未申酉戌亥',
  numString: '一二三四五六七八九十',
  monString: '正二三四五六七八九十冬腊',
  weekString: '日一二三四五六',
  sx: '鼠牛虎兔龙蛇马羊猴鸡狗猪',
  // 获取当前日期
  now: function (withWeek) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    var curDateTime = year;
    if (month > 9) {
      curDateTime = curDateTime + '年' + month;
    } else {
      curDateTime = curDateTime + '年0' + month;
    }
    if (date > 9) {
      curDateTime = curDateTime + '月' + date + '日';
    } else {
      curDateTime = curDateTime + '月0' + date + '日';
    }
    if (withWeek) {
      var weekday = '星期' + this.weekString[week];
      curDateTime = curDateTime + ' ' + weekday;
    }
    return curDateTime;
  },
  lunar: function () {
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    if (yy < 100) {
      yy = '19' + yy;
    }
    return this.getLunarDay(yy, mm, dd);
  },
  getLunarDay: function (solarYear, solarMonth, solarDay) {
    if (solarYear < 1949 || solarYear > 2100) {
      return '';
    } else {
      solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
      this.e2c(solarYear, solarMonth, solarDay);
      return this.getcDateString();
    }
  },
  getcDateString: function () {
    var tmp = '';
    /**
     * 显示农历年：（如：甲午(马)年）
     */
    /*
    tmp += this.tgString.charAt((this.cYear - 4) % 10);
    tmp += this.dzString.charAt((this.cYear - 4) % 12);
    tmp += "(";
    tmp += this.sx.charAt((this.cYear - 4) % 12);
    tmp += ")年 ";
    */
    if (this.cMonth < 1) {
      tmp += '(闰)';
      tmp += this.monString.charAt(-this.cMonth - 1);
    } else {
      tmp += this.monString.charAt(this.cMonth - 1);
    }
    tmp += '月';
    tmp += (this.cDay < 11) ? '初' : ((this.cDay < 20) ? '十' : ((this.cDay < 30) ? '廿' : '三十'));
    if (this.cDay % 10 != 0 || this.cDay == 10) {
      tmp += this.numString.charAt((this.cDay - 1) % 10);
    }
    return tmp;
  },
  lYearDays: function (y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (this.CalendarData[y - 1949] & i) ? 1 : 0;
    }
    return (sum + this.leapDays(y));
  },
  leapDays: function (y) {
    if (this.leapMonth(y)) {
      return ((this.CalendarData[y - 1949] & 0x10000) ? 30 : 29);
    }
    return (0);
  },
  leapMonth: function (y) {
    return (this.CalendarData[y - 1949] & 0xf);
  },
  monthDays: function (y, m) {
    // 月份参数从1至12，参数错误返回-1
    if (m > 12 || m < 1) {
      return -1;
    }
    return ((this.CalendarData[y - 1949] & (0x10000 >> m)) ? 30 : 29);
  },
  // 农历转换
  e2c: function () {
    this.theDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);

    var objDate = this.theDate;
    var y = objDate.getFullYear();
    var m = objDate.getMonth();
    var d = objDate.getDate();
    var temp = 0;
    var offset = (Date.UTC(y, m, d) - Date.UTC(1949, 0, 31)) / 86400000;
    for (i = 1949; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    this.cYear = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;
    // 农历月不是闰月
    var notLeapMounth = true;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == (leap + 1) && isLeap == false) {
        --i;
        isLeap = true;
        notLeapMounth = false;
        temp = this.leapDays(this.cYear); // 计算农历闰月天数
      } else {
        notLeapMounth = true;
        temp = this.monthDays(this.cYear, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == (leap + 1)) {
        isLeap = false;
      }
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //农历月
    this.cMonth = notLeapMounth ? i : -i;
    //农历日
    this.cDay = offset + 3;

    return {
      year: this.cYear,
      month: this.cMonth,
      day: this.cDay
    };
  },
  doubleNumber: function (num) {
    return num < 10 ? "0" + num : num;
  },
  format: function (date, tpl) {
    var week = "日一二三四五六";
    var Y = date.getFullYear();
    var M = this.doubleNumber(date.getMonth() + 1);
    var D = this.doubleNumber(date.getDate());
    var W = week.charAt(date.getDay());
    var h = this.doubleNumber(date.getHours());
    var i = this.doubleNumber(date.getMinutes());
    var s = this.doubleNumber(date.getSeconds());
    return tpl.replace(/\{Y\}/g, Y)
      .replace(/\{M\}/g, M)
      .replace(/\{D\}/g, D)
      .replace(/\{W\}/g, W)
      .replace(/\{h\}/g, h)
      .replace(/\{i\}/g, i)
      .replace(/\{s\}/g, s);
  },
  isArray: function (arr) {
    if (Array.isArray) {
      return Array.isArray(arr);
    }
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
};

module.exports = dateTool;
