/**
 * 当前日期时间
 */
function current() {
  // 星期几
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  // 当前日期
  const date = new Date()
  // 年月日
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  // 时分秒
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  // 补零
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  // 星期几
  const weekday = weekdays[date.getDay()]
  // 格式化处理
  // return year + '-' + month + '-' + day + hour + '点' + minute + '分 ' + '星期' + weekdays[weekday];
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday
  }
}

/**
 * 当前格式化好的年月
 */
function currentYearMonth() {
  const { year, month } = this.current()
  return year + '-' + month
}
/**
 * 当前格式化好的年
 */
function currentYear() {
  const { year } = this.current()
  return year
}
/**
 * 当前格式化好的日期
 */
function currentDate() {
  const { year, month, day } = this.current()
  return year + '-' + month + '-' + day
}

/**
 * 获得月天数
 * @param date 日期Date实例，没有传递则使用当前日期
 * @returns {number}
 */
function days(date) {
  let month
  if (date == undefined) {
    month = (new Date()).getMonth() + 1
  } else {
    month = date.getMonth() + 1
  }
  let day = 0
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      day = 31
      break
    case 2:
      day = 29
      break
    case 4:
    case 6:
    case 9:
    case 11:
      day = 30
      break
  }
  return day
}

/**
 * 当前月的天集合
 * @returns {[]}
 */
function dayItems() {
  const records = []
  for (let i = 1; i <= this.days(); i++) {
    records.push(i)
  }
  return records
}

/**
 * 制定日期那个月的天集合
 * @param date Date实例
 * @returns {[]}
 */
function dayItemsByDate(date) {
  const records = []
  for (let i = 1; i <= this.days(date); i++) {
    records.push(i)
  }
  return records
}

export default {
  current,
  currentDate,
  currentYearMonth,
  days,
  dayItems,
  dayItemsByDate,
  currentYear
}
