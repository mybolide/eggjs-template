/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

export function extractImageUrls(markdown) {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const imageUrls = [];

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const imageUrl = match[2];
    imageUrls.push(imageUrl);
  }

  return imageUrls;
}

export function extractFieldValue(jsonString, fieldName) {
  const regex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)"`);
  const match = jsonString.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return null;
  }
}


export function extractJsonFromString(data) {
  // 使用正则表达式匹配第一个 { 和最后一个 } 之间的内容
  const regex = /{[\s\S]*}/;
  const match = data.match(regex);

  if (match) {
      try {
          return JSON.parse(match[0]);
      } catch (error) {
          console.error("解析 JSON 时出错:", error);
          return {};
      }
  } else {
      console.error("未找到有效的 JSON 数据");
      return {};
  }
}