function clearDeep(obj) {
  if (!obj || !typeof obj === 'object') return
  const keys = Object.keys(obj)
  for (var key of keys) {
    const val = obj[key]
    if (
      typeof val === 'undefined' ||
      ((typeof val === 'object' || typeof val === 'string') && !val)
    ) {
      // 如属性值为null或undefined或''，则将该属性删除
      delete obj[key]
    } else if (typeof val === 'object') {
      // 属性值为对象，递归调用
      clearDeep(obj[key])
      if (Object.keys(obj[key]).length === 0) {
        // 如某属性的值为不包含任何属性的独享，则将该属性删除
        delete obj[key]
      }
    }
  }
}

function dataToTree(data) {
  data = JSON.parse(JSON.stringify(data))
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
      delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {};
  data.forEach(function (item) {
      map[item.id] = item;
  });
//        console.log(map);
  var val = [];
  data.forEach(function (item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item.parentId];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
          (parent.children || ( parent.children = [] )).push(item);
      } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
      }
  });
  return val;
}

function extractFieldValue(jsonString, fieldName) {
  // console.info(jsonString)
  const regex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)"`);
  const match = jsonString.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return null;
  }
}


function extractJsonFromString(data) {
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

module.exports = {
  sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  },
  clearDeep,
  dataToTree,
  extractFieldValue,
  extractJsonFromString
}

// const a = "```json\n{\n  \"keywords\": [\n    \"阻止按钮提交表单\", \n    \"button 默认行为\", \n    \"JavaScript 阻止表单提交\",\n    \"event.preventDefault()\",\n    \"type=\\\"button\\\"\",\n    \"HTML 表单提交\",\n    \"禁用按钮提交\",\n    \" 表单自动提交\",\n    \"前端表单控制\",\n    \"网页按钮功能\"\n  ],\n  \"description\": \"网页按钮意外提交表单？  掌握阻止按钮默认行为的技巧，轻松解决！ 使用 `type=\\\"button\\\"` 属性、`event.preventDefault()` 方法或调整按钮位置，精准控制表单行为，提升用户体验。\",\n  \"title\": \"如何阻止按钮自动提交表单？\"\n}\n``"
// const b = extractFieldValue(a, 'description')
// console.info(b)